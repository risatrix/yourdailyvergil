#YourDailyVergil Bot

Uses the newly created [Aeneid API](http://aeneid.eu/api/)
to Tweet a line of Vergil's Latin, plus translation, about every hour.
The goal is to Tweet the whole of the _Aeneid_ in a year, for 2015.

Also meant to be a [learning tool](https://github.com/risatrix/yourdailyvergil#tutorialish-suggestions-for-the-innocent-and-doomed)
for humanists who want to program.

Forked from Darius Kazemi's [ExampleBot](https://github.com/dariusk/examplebot),
with some features from his [MetaphorAMinute](https://github.com/dariusk/metaphor-a-minute) Bot.

##How to Run VergilBot Locally

Even if you don't want to connect to Twitter, you can run this as-is and see the output
locally in your computer's console.

_Note: you must be comfortable using your computer's command line interface to use this bot.
If you've never used it, there are tutorials for [Mac OSX](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line)
and [Windows](http://www.bleepingcomputer.com/tutorials/windows-command-prompt-introduction/)._

If you don't already have have them, please install [Node.js](http://nodejs.org/).
This will install two programs: `node`, which runs JavaScript from the command line,
and `npm`, which helps you install software that Node.js can run.

Make an empty project directory somewhere convenient for you,
[download this file](https://github.com/risatrix/yourdailyvergil/archive/master.zip),
and unzip the contents to your project directory. Go to your project directory in the command line
(the command in this case is `cd`). There should be four files there: `.gitignore`, `README.md`, `bot.js`, and `package.json`.
In that directory type:

`npm install twit`
`npm install request`

This installs some code to the `npm_modules` subdirectory, which you don't need to worry about.
(It's Twit, the library that lets us talk to Twitter, and Request, the library that lets us make
calls the the Aeneid API.)

If you're not connecting to Twitter, comment out the `bot.js` line that reads:
`var T = new Twit(require('./config.js'));` by putting a `//` in front of it.
(Otherwise the server will freak out when it tries to look for a missing file.)

Once this is done, you should be able to run `node bot.js` in the Terminal.
If all goes well, you'll see the Aeneid begin running through your terminal window.

##Connecting to Twitter

To connect to Twitter you need to register a Twitter account and also get its "app info".

So create a Twitter account for whatever account you want to tweet this stuff. Twitter doesn't allow you to register multiple twitter accounts on the same email address. I recommend you create a brand new email address (perhaps using Gmail) for the Twitter account. Once you register the account to that email address, wait for the confirmation email.
You'll then need to add a phone number to be able to post to Twitter remotely. Hint: use a
Google phone number if it recognizes your real one.

Then go here and log in as the Twitter account for your bot:

https://dev.twitter.com/apps/new

Once you're there, fill in the required fields: name, description, website. None of it really matters at all to your actual app, it's just for Twitter's information. Do the captcha and submit.

Next you'll see a screen with a "Details" tab. Click on the "Settings" tab and under "Application Type" choose "Read and Write", then hit the update button at the bottom.

Then go back to the Details tab, and at the bottom click "create my access token". Nothing might happen immediately. Wait a minute and reload the page. then there should be "access token" and "access token secret", which are both long strings of letters and numbers.

Now you'll need to add your own `config.js` file. You can do this in your text editor.

It will need to look like this:

```javascript
module.exports = {
  consumer_key:               'YOUR_AUTH_STUFF_HERE',
  consumer_secret:            'YOUR_AUTH_STUFF_HERE',
  access_token:               'YOUR_AUTH_STUFF_HERE',
  access_token_secret:        'YOUR_AUTH_STUFF_HERE',
};
```


In between those quotes, instead of `'YOUR_AUTH_STUFF_HERE'`, paste the appropriate info from your app's Details page. This is essentially the login information for the app.

Now if you type the following in the command line in your project directory:

`node bot.js`

You should be see a Vergil Tweet appear in the account.

#Tutorial(ish) Suggestions for the Innocent and Doomed

If you're a humanist who wants to program, it can be hard to find projects
that speak to your interests. I thought this could serve as a good example
of something that combines core programming concepts with subject matter that's
of interest (and not just the Latin -- the API provides [three separate translations](http://api.aeneid.eu/versions).)

I've commented the bot.js file extensively, if you're interested.
And you don't have to build a Twitterbot; doing anything with the Aeneid API
is a good place to start programming. The API itself is public and very simple.
Accessing it will give you experience with [APIs](http://skillcrush.com/2012/07/04/api-2/)
 and [getting info from them](http://www.smashingmagazine.com/2012/02/09/beginners-guide-jquery-based-json-api-clients/);
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
