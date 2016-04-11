Top reddit Twitter Bot
=========================

This is a simple Twitter bot written in Node.js that tweets top reddit posts of selected subreddits at regular intervals

How to use
-----------
1. To use this bot, you need to make sure you have [node.js](https://nodejs.org/) installed on your system and all the required dependencies are installed on your system using npm.
2. Make sure you have a Twitter account created to use as a bot. You will need to enter the following values of your twitter account for the bot to be able to post to your account: `consumer_secret`, `consumer_key`, `access_token` & `access_token_secret`. These values need to be entered in the `topreddit.js` file. While creating these keys on your Twitter account, make sure you give this app `Read and Write` access to be able to post on the account.
3. Make sure you update all the configurable variables in `topreddit.js` file according to your needs.
4. `cd` into the directory where this project files are located and run `node topreddit.js` from your command line. You need to keep the script running for it to post at regular intervals. For regular use without access to a server, you might want to run this script from a cloud-based server like Amazon AWS or Red Hat's Openshift.

Dependencies
------------
To use this bot, you need to install the following nodejs modules using npm:

```npm install -g request
npm install -g node-twitterbot
```

LICENSE
--------
```
The MIT License (MIT)

Copyright (c) 2016 - Chirag Bhatia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```