#YourDailyVergil Bot

Uses the newly created [Aeneid API](http://aeneid.eu/api/)
to Tweet a line of Vergil's Latin, plus translation, about every hour.
The goal is to Tweet the whole of the Aeneid in a year, for 2015.

Adapted from Darius Kazemi's [ExampleBot](https://github.com/dariusk/examplebot),
with some features from his [MetaphorAMinute](https://github.com/dariusk/metaphor-a-minute) Bot.

#Tutorial(ish) Suggestions

If you're a humanist who wants to program, it can be hard to find projects
that speak to your interests. I thought this could serve as a good example
of something that combines core programming concepts with subject matter that's
of interest.

I've commented the bot.js file extensively, if you're interested.
And you don't have to build a Twitterbot; doing anything with the Aeneid API
is a good place to start. The API itself is public and very simple.
Accessing it will give you experience with [APIs](http://skillcrush.com/2012/07/04/api-2/)
 and [getting info from them](http://themarklee.com/2014/04/03/pulling-json-data-open-data-api/);
 understanding [web page headers](http://code.tutsplus.com/tutorials/http-headers-for-dummies--net-8039);
loops; and even some error handling.

A big part of programming is breaking down large tasks into smaller ones,
and iterating on an idea to make it progressively better. While building this,
I used roughly the following steps:

1. Grab the first line of every book from the API using a self-incrementing loop,
and output them into the Terminal console.
2. Build a function that returns to the first book after you hit Book 12.
3. Add the ability to grab sequential lines from each book, instead of just the first line.
4. Make the app smarter by allowing it to use a "not found" 404 error
as a trigger for the 'start a new book' functionality.
5. Grab the English translation for a successfully retreived Latin phrase,
and add it to the output.
6. Make the ultimate output a Tweet. Note that you can program the rest
of the functionality without having to worry about that part, or any output.

I used Node (a kind of Javascript), but the first five tasks can be accomplished
in any programming language -- making the input show up in the console means you don't have to futz with HTML.
If you don't want to mess around with authentication and Twitter, you could make
the lines show up on a webpage, as a variation.
