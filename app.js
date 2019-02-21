var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    Post        = require("./models/post.js"),
    bodyParser  = require("body-parser");

mongoose.connect("mongodb://localhost/olob_blog", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
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

app.get("/new", function(req, res){
   res.render("new"); 
});

app.post("/new", function(req, res){
    // get data from form
    var newTitle = req.body.title;
    var newBody = req.body.body;
    var newName = req.body.name;
    // add to posts array
    var newPost = {title: newTitle, body: newBody, name: newName};
    
    Post.create(newPost, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            console.log("title - " + newTitle);
            console.log("body - " + newBody);
            console.log("name - " + newName);
            console.log(req.body.image);
            res.redirect("/");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("OLOB server is up and running!")
});