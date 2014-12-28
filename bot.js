// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// URLs to create Vergil Tweets
var LatinURLBase = "http://api.aeneid.eu/versions/latin/";
var EnglishURLBase = "http://api.aeneid.eu/versions/dryden/";

var book_counter = 1;
var line_counter = 0;

var english = "";
var latin = "";

function makeVergil() {
    line_counter += 1;

    var getLatinURL = LatinURLBase + '/' + book_counter + '/' + line_counter;
    var getEnglishURL = EnglishURLBase + '/' + book_counter + '/' + line_counter;

	request(getLatinURL,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                latin = (data.text);
                //only request the English trans if the Latin returned okay
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
                        //only proceed with output if status is okay
                        statement = latin + '/ ' + english;
                        console.log('book ' + book_counter + ', line ' + line_counter);
                        console.log(statement);
                        // T.post('statuses/update', { status: exclamation},
                        //     function(err, reply) {
                        //         console.log("error: " + err);
                        //         console.log("reply: " + reply);
                        // });
  		        });
            }
            else {
                console.log('Status Code: ' + response.statusCode);
                var error_msg = (JSON.parse(body)).error;
                console.log('Error:' + error_msg);
                //Because it's just a bot, wer'e going to assume that an error
                //means we've run out of lines in the book
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
            }
        });
}

// Try to retweet something as soon as we run the program...
makeVergil();

// ...and then every 2 seconds after that. Time here is in milliseconds, so
// 1000 ms = 1 second. The rate limit for the Aeneid API is 1 call per user
// per second, there are two calls made per Tweet, so the base unit should be 2000.
setInterval(makeVergil, 2000);
