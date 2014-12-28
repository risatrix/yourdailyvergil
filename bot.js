// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// URLs to create Vergil Tweets
var LatinURLBase = "http://api.aeneid.eu/versions/latin/";
var EnglishURLBase = "http://api.aeneid.eu/versions/dryden/";

var book_counter = 0;
var line_counter = 0;

var english = "";
var latin = "";

function makeVergil() {
    line_counter += 1;
    // There are only 12 books in the Aeneid
    if (book_counter <= 11) {
        book_counter +=1;
    }
    else {
        //reset entirely if we get past the last book
        book_counter = 1;
        line_counter = 1;
    }
    getLatinURL = LatinURLBase + '/' + book_counter + '/' + line_counter;
    getEnglishURL = EnglishURLBase + '/' + book_counter + '/' + line_counter;
	request(getLatinURL,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
    	       latin = (data.text);
  		}
        request(getEnglishURL,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                english = (data.text);
                // console.log(english);
            }
        statement = latin + '/ ' + english;
        console.log('book ' + book_counter + ', line ' + line_counter);
        console.log(statement);
        });
    });
}

// Try to retweet something as soon as we run the program...
makeVergil();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(makeVergil(), 1000 * 60 * 60);
