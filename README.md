#YourDailyVergil Bot

Uses the newly created [Aeneid API](http://aeneid.eu/api/)
to Tweet a line of Vergil's Latin, plus translation, about every hour.
The goal is to Tweet the whole of the Aeneid in a year.

Adapted from Darius Kazemi's [ExampleBot](https://github.com/dariusk/examplebot),
with some help from his [MetaphorAMinute](https://github.com/dariusk/metaphor-a-minute) Bot.

#Tutorial(ish) Suggestions

If you're a humanist who wants to program, it can be hard to find projects
that speak to your interests. The Aeneid API is a good one to start with
since it's public and very simple.

Building something like I've done here will give you experience with [APIs](http://skillcrush.com/2012/07/04/api-2/)
 and [getting info from them](http://themarklee.com/2014/04/03/pulling-json-data-open-data-api/);
 understanding [web page headers](http://code.tutsplus.com/tutorials/http-headers-for-dummies--net-8039),
loops, and even some error handling.

The steps I took to build this were:
1) Grab the first line of every book from the API using a self-incrementing loop,
and output it into the Terminal console.
2) Build in a control structure that returns to the first book after you hit Book 12.
3) Add the ability to grab sequential lines from each book.
4) Make the app smarter by allowing it to use a "not found" 404 error.
as a trigger for the 'start a new book' functionality.
5) Make the ultimate output a Tweet. Note that you can program the rest
of the functionality without having to worry about that part.
