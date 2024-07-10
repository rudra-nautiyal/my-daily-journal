//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hello, I'm Rudra Nautiyal, a full stack developer. This blog is where I document my journey and share insights along the way.";
const aboutContent = "I am Rudra Nautiyal, a highly motivated and dedicated student pursuing a Bachelor of Technology (B.Tech) degree at Guru Gobind Singh Indraprastha University. Passionate about technology and its applications, I am constantly seeking opportunities to expand my knowledge and skills in this rapidly evolving field."
const contactContent = "You can contact me at rudra.x.nautiyal@gmail.com"
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render('home', {home: homeStartingContent, journal: posts});
});

app.get("/about", function(req, res) {
  res.render('about', {about: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render('contact', {contact: contactContent});
});

app.get("/compose", function(req, res) {
  res.render('compose');
});

app.post("/compose", function(req, res) {
  const post = {
    titleText: req.body.postTitle,
    titleBody: req.body.postBody,
  };
  posts.push(post);

  res.redirect("/");
});

app.get('/posts/:titleurl', function(req, res) {
  const requestedTitle = _.lowerCase(req.params.titleurl);

  let foundPost = null;

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.titleText);

    if (storedTitle === requestedTitle) {
      foundPost = post;
    }
  });

  if (foundPost) {
    res.render('post', {title: foundPost.titleText, content: foundPost.titleBody});
  } else {
    console.log("Well, this wasn't supposed to happen.")
  }
});

app.listen(3000, function() {
  console.log("Server is Online!");
});
