//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const _ = require("lodash");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
}

const post = mongoose.model("post", postSchema);


// var posts=[];

app.get("/", function (req, res) {
  // res.render("home", {
  //   startingcontent: homeStartingContent,
  //   posts:posts
  // });  

  post.find({}, function (err, foundpost) {
    res.render("home",
      {
        startingcontent: homeStartingContent,
        posts: foundpost
      });
  })
});

app.get("/about", function (req, res) {
  res.render("about", { aboutcontent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactcontent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", { 
      title: post.title, 
      content: post.content 
    }); 
  });


  // posts.forEach(function (post) {
  //   if (_.lowerCase(req.params.topic) === _.lowerCase(post.postTitle)) {
  //     res.render("post", {
  //       title: post.postTitle,
  //       content: post.postBody
  //     });
  //   }
  // })
})

app.post("/compose", function (req, res) {

  const postNew = new post({
    title: req.body.postT,
    content: req.body.postBody
  });

  postNew.save(function (err) {

    if (!err) {

      res.redirect("/");

    }

  });


  //This was used when we did not have a model and we relied not on the database but on arrays.
  // const post={
  //   postTitle: req.body.postT,
  //   postBody: req.body.postBody
  // };
  // posts.push(post);
  // res.redirect("/");
})









app.listen(3000, function () {
  console.log("Server started on port 3000");
});
