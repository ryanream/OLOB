var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost/olob_blog", {useNewUrlParser: true});

// Create the post Schema
var postSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: String
});

// Compile into a model (using above Schema) that allows the use of methods (.find(), .create())
var Post = mongoose.model("Post", postSchema);

// // Make new post
// var entry1 = new Post({
//     title: "Number 4 here",
//     body: "text text text",
//     date: "2.20.19"
// });

// // Save new post
// entry1.save(function(err, post){
//     if(err){
//         console.log("Something went wrong with- " + post );
//     } else {
//         console.log("We have saved a new post to the database!");
//         console.log(post);
//     }
// });

// Make and save new post at once
// Post.create({
//     title: "Post added with .create method",
//     body: "no body here"
// }, function(err, post){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("CREATED w/no errors");
//     }
// });

// Find and print all posts
// Post.find({}, function(err, posts){
//     if(err){
//         console.log("error" + err);
//     } else {
//         console.log("all the posts - ");
//         console.log(posts);
//     }
// });

module.exports = mongoose.model("Post", postSchema);