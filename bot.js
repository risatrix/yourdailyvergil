// Our Twitter library
var Twit = require('twit');

// If connecting to Twitter you'll need to add your info to the config file
var T = new Twit(require('./config.js'));

// Our base statement (= a container to hold the final statement)
var statement = "";
// convenience containers to hold the two parts of the statement
var english = "";
var latin = "";

// Base URLs to hit the Aeneid API
// The book and line numbers will be added automatically via loop
var LatinURLBase = "http://api.aeneid.eu/versions/latin/";
var EnglishURLBase = "http://api.aeneid.eu/versions/dryden/";

// counters to keep track of book and line numbers
var book_counter = 1;
var line_counter = 0;

function makeVergilTweet() {
    //increment the line number
    line_counter += 1;

    //build urls for the new line
    var getLatinURL = LatinURLBase + '/' + book_counter + '/' + line_counter;
    var getEnglishURL = EnglishURLBase + '/' + book_counter + '/' + line_counter;

    //use the Node request module to visit the api page urls
	request(getLatinURL,
        function (error, response, body) {
            // if the URL returns info and the status is okay
            // we'll start building the Tweet
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                latin = (data.text);
                //we only request the English URL if the Latin returned okay
                request(getEnglishURL,
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var data = JSON.parse(body);
                            english = (data.text);
                        }
                        else {
                            //Less informative because any line number errors
                            //should be taken care of by the first if stmt
                            console.log('Status Code: ' + response.statusCode);
                        }
                        //builds the Tweet
                        statement = latin + '/ ' + english;
                        console.log('book ' + book_counter + ', line ' + line_counter);
                        console.log(statement);
                        //Tweets the Tweet
                        // T.post('statuses/update', { status: exclamation},
                        //     function(err, reply) {
                        //         console.log("error: " + err);
                        //         console.log("reply: " + reply);
                        // });
  		        });
            }
            //if the header returns anything other than 200 (=okay),
            //we won't build anything.
            else {
                //Print out the status and error message so we know what's going on.
                console.log('Status Code: ' + response.statusCode);
                var error_msg = (JSON.parse(body)).error;
                console.log('Error:' + error_msg);
                //In this context, most errors will be 404s that mean
                //we've run out of lines in the book, so we'll trigger a switch
                //to the next book. In a real app, we'd need better error handling.
                console.log('Changing books...');
                // There are only 12 books in the Aeneid, so...
                if (book_counter <= 11) {
                    book_counter +=1;
                }
                else {
                    //Go back to first book if we've finished 12
                    book_counter = 1;
                }
                line_counter = 0;
                //TODO: For example, what would happen for a 429 (too many requetsts)
                //or 500 (server down?)
            }
        });
}


// Try to tweet something as soon as we run the program...
makeVergilTweet();

// ...and then every 2 seconds after that. Time here is in milliseconds, so
// 1000 ms = 1 second. The rate limit for the Aeneid API is 1 call per user
// per second, there are two calls made per Tweet, so the base unit should be 2000.
setInterval(makeVergilTweet, 2000);
