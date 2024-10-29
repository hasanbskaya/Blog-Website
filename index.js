const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let posts = []; // This will store posts temporarily

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // For serving CSS

// Home route - View all posts
app.get("/home", (req, res) => {
  res.render("home", { posts });
});

// Posts page - Write a new post or edit existing one
app.get("/posts", (req, res) => {
  const editId = req.query.editId ? parseInt(req.query.editId) : null;
  const content = req.query.content || '';
  res.render("posts", { editId, content }); // Pass both variables to the view
});

// About page
app.get("/about", (req, res) => {
  res.render("about");
});

// Handle post submission
app.post("/posts", (req, res) => {
  const postId = req.body.editId ? parseInt(req.body.editId) : null; // Parse editId if it exists
  const postContent = req.body.postContent;

  if (postId) {
    // Update existing post
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      posts[postIndex].content = postContent; // Update the post content
    }
  } else {
    // Create new post
    const post = {
      id: Date.now(), // Unique ID for each post
      content: postContent,
    };
    posts.push(post); // Add new post to the array
  }
  
  res.redirect("/home"); // Redirect to home after submission
});

// Delete a post
app.post("/delete-post", (req, res) => {
  const postId = parseInt(req.body.postId);
  posts = posts.filter(post => post.id !== postId);
  res.redirect("/home");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
