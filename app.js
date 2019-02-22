var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    Post        = require("./models/post.js"),
    bodyParser  = require("body-parser");
    
    mongoose.connect("mongodb://localhost/olob_blog", {useNewUrlParser: true});

// mongodb+srv://ryanream:<PASSWORD>@cluster0-mqbh5.mongodb.net/test?retryWrites=true
// mongoose.connect("mongodb+srv://ryanream:<mongopassword>@cluster0-mqbh5.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});
    // var uri = "mongodb://ryanream:mongopassword@cluster0-shard-00-00-mqbh5.mongodb.net:27017,mycluster0-shard-00-01.mongodb.net:27017,mycluster0-shard-00-02.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin";

    // var MongoClient = require('mongodb').MongoClient;
    // // var uri = "mongodb://ryanream:mongopassword@cluster0-shard-00-00-mqbh5.mongodb.net:27017,cluster0-shard-00-01-mqbh5.mongodb.net:27017,cluster0-shard-00-02-mqbh5.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
    // var uri = "mongodb+srv://ryanream:mongopassword@cluster0-mqbh5.mongodb.net/test?retryWrites=true";
    // MongoClient.connect(uri, {useNewUrlParser: true}, function(err, db) {
    //     if(err) {
    //         console.log(err);
    //     }
    // });    
    
    // var MongoClient = require('mongodb').MongoClient;
    // var uri = "mongo "mongodb+srv://cluster0-mqbh5.mongodb.net/test";
    // MongoClient.connect(uri, {useNewUrlParser: true}, function(err, db) {
    //     if(err) {
    //         console.log(err);
    //     }
    // });

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
    var newImage = req.body.image;
    var newPhoto = req.body.photo;
    // add to posts array
    var newPost = {title: newTitle, body: newBody, name: newName, image: newImage, photo: newPhoto};

    Post.create(newPost, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            console.log("New post by - " + newName);
            res.redirect("/");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("OLOB server is up and running!")
});