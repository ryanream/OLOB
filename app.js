var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    Post        = require("./models/post.js"),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    
console.log(process.env.DATABASEURL);

mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});

// mongoose.connect("mongodb://localhost/olob_blog", {useNewUrlParser: true});
// mongoose.connect("mongodb://ryanream:mongopassword@cluster0-shard-00-00-mqbh5.mongodb.net:27017,cluster0-shard-00-01-mqbh5.mongodb.net:27017,cluster0-shard-00-02-mqbh5.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// HOME
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

// CREATE ROUTE
app.get("/new", function(req, res){
  res.render("new"); 
});

// POST ROUTE
app.post("/new", function(req, res){
    // get data from form
    var newTitle = req.body.title;
    var newBody = req.body.body;
    var newName = req.body.name;
    var newImage = req.body.image;
    var newPhoto = req.body.photo;
    // add to posts array
    var newPost = {title: newTitle, body: newBody, name: newName, image: newImage, photo: newPhoto};

    Post.create(newPost, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            console.log("A new post by " + newName + " was published.");
            res.redirect("/");
        }
    });
});

// SHOW ROUTE
app.get("/:id/edit", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect("/");
        } else {
            res.render("edit", {post: foundPost});
        }
    });
});

// EDIT ROUTE
app.put("/:id", function(req, res){
    // find and update correct post
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/")
        }
    });
});

// DESTROY ROUTE
app.delete("/:id", function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    })
});

// INFO ROUTE
app.get("/info", function(req, res){
    res.render("info");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("OLOB server is up and running!")
});