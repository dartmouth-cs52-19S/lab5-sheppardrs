# Lab 5 Server for Blog
## CS52 with Tim Tregubov
Sheppard Somers May 2019

# Goal
Create a mimic of the class api that can store blogs and return them. It has the paths: 
* GET /api/posts/ returns only title and tags for all posts [[{"id":"",title":"","tags":""},...]
* POST /api/posts/ with post parameters {'title', 'tags', 'content'} creates a new post
* PUT /api/posts/:postID with parameters {'title', 'tags', 'content'} will update an entry
* GET /api/posts/:postID returns the post found at postID
* DELETE /api/posts/:postID deletes the post found at postID

# What Worked/What Didn't
## Worked 
What it is rn. At least as far as I can tell. 

## Didn't
I forgot that mongoose returns promises so you have to use .then or pass in a function that then stores (sends) the results. I basically inverted it like it was a normal function, and put the find() inside of the res.send, rather than the other way around. I also had an issue where I was testing with CURL where I pasted the id incorrectly and didn't think to retype the curl request as it kept failing. This took a lot of time as silly bugs normally do. But was all fine when I realized this and sent a correct curl request. 

# Tech Stack
* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

# Sources
The frontend has its own sources listed. This part as usual is based mainly off of the assignment and class materials. Katie Goldstein reminded me that the mongoose methods return a promise. 