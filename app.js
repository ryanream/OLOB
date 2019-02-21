var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    Post        = require('./models/post.js');

mongoose.connect("mongodb://localhost/olob_blog", {useNewUrlParser: true});

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);

// app.get("/", function(req, res){
//     res.render("home");
// });

app.get("/", function(req, res){
//   Get all posts from DB
    Post.find({}, function(err, allPosts){
        if(err) {
            console.log(err);
        } else {
            res.render("home", {posts: allPosts});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("OLOB server is up and running!")
});