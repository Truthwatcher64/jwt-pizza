I had an interest in how har files work and where they can be used in testing and development. I was initially intrigued by these because I first saw them when we were discussing how to do a Grafana logs and Load testing and how you can use these to create the semblance of a user approaching a site and do things, sort of how playwright records user insteraction as well. 

## What's a har file
The contents of a har file are written in json, and it is just a long list of everything that is recorded when you connect to a site. This inclues 
- information about your computer and browser 
- information about the server that is hosting
- the actual http reqeusts and responses
- headers including cookies

For a test site that came from a simple site that I was running on a local machine the length of the file was 489 lines. This was just the record of just http communication for loading the page as well. 
Going to the BYU homepage got me a file that was 10011 lines long. It also had serveral lines inside of it that were longer that 100,000 characters wide. 

While this seems big these files still remain in kilobytes of size and the fact that they are entirely in json makes them easy to use and distribute despite growing in size quite a lot. Every language has some sort of JSON parser so it is entirely possible to easily write and application that parses the har file as json and uses it as the basis for sending network requests. 

## Hars and Playwright
I was very convinced for a bit that playwright was basically just a very fancy extension of how Har files work, in that was simply taking actions and was converting it into the equivalent of a Har file. Playwright definitely is a higher complexity than what simple har files are. While playwright might utilize har filess or something similar to make network requests, the selection of objects on a page is entirely a different thing and is unique to playwright. Playwright has the ability to search through the dom to find elements even if it might be a dynamic dom through react. 

## Hars and Grafana
Har files are also really cool because of their ease of use. They don’t require you to add any extra details into your own code and are minimally invasive if you are working on someone else’s website. 
One of the easiest ways to load test a site through Grafana or something similar is through a har file. A user can make a log that similates them as a regular user on a site and with that they can exis obviously able to take this file and create a script based on it. While Grafana does pull out all of the data from the file all that it really needs it is able to use them efficiently to create a chian of easily repeatable network requests.  There’s also a lot of other data that is available that is not typically used by Grafana. They usually only pull out the headers and request and use those to hit sites. This means they keep the minimaly request data that they need. The http responses are used to verify that everything worked well. This greatly speeds things up because you do not need to write tests that check each field individually when you are starting with a pair of requests and responses that can be consistently matched up. 
To create a more robust tester you could also include the information about your browser like model and version to see if there are any differences when it reaches the destination. 

## Takeaways from this
Har files are really boring. They are only cool or useful because they are so simple. I feel like everything I looked at simply used them as a small portion in how something else worked. In following up with this idea I did a lot more research on how you can automate a lot of the things that we as humans do at its interactions on the web and how those things can be basically tracked through har file records, and then we can use them as testing in our code to try things out. 

---
I thought going into this report that it was going to be more interesting than it really ended up being.  What I realized that it was like incredibly simple, how these worked. I was also pretty intrigued about ways you could use it and most of the ways you can use it are pretty much fore-testing or for simulating users and they don’t have too much else use. I’m sorry if this doesn’t seem super interesting, but I was most of the way through the report when I realized that there wasn’t much here, but I still found it intriguing to jump in and my initial thoughts about the subject were what were the best part of this to me, so that’s why I chose it as my subject.



