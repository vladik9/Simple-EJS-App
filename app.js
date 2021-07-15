// global variables
const allPosts = [];
// end of section
//special module for tolowerCase functions
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { toLower } = require("lodash");
const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a est eget arcu cursus faucibus et eu enim. Etiam elementum maximus massa, id tristique orci. Duis venenatis felis turpis, non faucibus tellus maximus sed. Duis pellentesque augue id vehicula tempus. Mauris molestie convallis finibus. Praesent eu mi tempus, convallis libero vel, tempor leo. Nunc commodo vitae ante non elementum. Quisque eleifend dignissim lorem, nec auctor metus cursus a. Praesent pharetra ex enim, in laoreet ante imperdiet pellentesque.";
const aboutContent =
  "Proin placerat vestibulum leo, at molestie eros molestie ac. Sed ac mi at sem imperdiet suscipit. Sed maximus, sapien at tristique euismod, massa lorem aliquet nunc, vel fringilla velit nisl vel mi. Suspendisse dictum molestie mi, id rutrum purus fermentum in. Morbi hendrerit sodales commodo. Aenean vel felis neque. Praesent elit eros, fermentum vel eros malesuada, tristique placerat quam. Etiam suscipit luctus mi quis vestibulum. Aliquam aliquam imperdiet neque. Praesent ullamcorper mattis orci in accumsan. Ut tincidunt dui eget luctus facilisis. Suspendisse elementum quam at ante pellentesque, vel luctus dolor rhoncus. Aenean blandit tristique metus, ac pharetra tellus scelerisque vel. In sapien mauris, blandit quis massa vel, tincidunt luctus massa. Nulla venenatis eros sed hendrerit dictum. Curabitur ut pretium felis.";
const contactContent =
  "In hac habitasse platea dictumst. Mauris porta velit nisl, malesuada vulputate erat placerat non. Praesent erat arcu, eleifend eget consequat vel, dignissim in turpis. Sed venenatis ligula massa, vel rhoncus ante faucibus ac. Duis consectetur sed magna eget tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam risus velit, dictum ut nisl eget, vulputate suscipit sem. Praesent aliquam, turpis at posuere malesuada, neque tortor scelerisque magna, dictum lobortis justo lacus a justo. Phasellus mattis rutrum mollis. Morbi libero magna, suscipit non purus vitae, lobortis dapibus est.";
// declare a app variable and assign it to express module
const app = express();
//use of ejs view engine
app.set("view engine", "ejs");
// seting the bodyparser extension
app.use(bodyParser.urlencoded({ extended: true }));
// aplay the static webpage for Css
app.use(express.static("public"));
// manage the get request for this app
app.get("/", (req, res) => {
  // render a message to this webpage and post varaible content in the right place
  res.render("home", {
    homeText: homeStartingContent,
    postList: allPosts,
  });
});
// render a message to this webpage and post varaible content in the right place

app.get("/home", (req, res) => {
  res.render("home", {
    homeText: homeStartingContent,
    postList: allPosts,
  });
});
// render a message to this webpage and post varaible content in the right place

app.get("/about", (req, res) => {
  res.render("about", { AboutText: aboutContent });
});
// render a message to this webpage and post varaible content in the right place

app.get("/contact", (req, res) => {
  res.render("contact", { ContactText: contactContent });
});
// render a message to this webpage and post varaible content in the right place

app.get("/comppose", (req, res) => {
  res.render("comppose");
});
// manage post request for user message and store it in  a json called userPost whit 2 fields
app.post("/comppose", (req, res) => {
  const userPost = {
    userInputTitle: req.body.postTitle,
    userInputMessage: req.body.postMessage,
  };
  // push json in a vector
  allPosts.push(userPost);
  //redirect to home afeter the user press enter key
  res.redirect("/");
});
// manage a get request to the user call
app.get("/post/:userPost", (req, res) => {
  //call the lowdash method for change item in lower case and whiothout spaces
  let itemPost = _.lowerCase(req.params.userPost);
  //use a loop to compare eache item whit iteme typed by user
  allPosts.forEach((userPost) => {
    let compareItemPost = _.lowerCase(userPost.userInputTitle);
    // if a similar item is detected render a new page whit content of existing user post in vector
    if (compareItemPost === itemPost) {
      res.render("post", {
        userPostTitle: userPost.userInputTitle,
        userPostContent: userPost.userInputMessage,
      });
    }
  });
});
// used for port starting
app.listen(8080, () => {
  console.log("port 8080 is running");
});
