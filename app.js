//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "I am Rudra Nautiyal, a highly motivated and dedicated student pursuing a Bachelor of Technology (B.Tech) degree at Guru Gobind Singh Indraprastha University. Passionate about technology and its applications, I am constantly seeking opportunities to expand my knowledge and skills in this rapidly evolving field. As a full stack developer proficient in the MERN stack (MongoDB, Express.js, React, Node.js), I have a strong foundation in both front-end and back-end development. My projects demonstrate my ability to design and implement robust, scalable web applications that meet user needs and industry standards."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
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
