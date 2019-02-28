var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Post        = require("./models/post.js"),
    bodyParser  = require("body-parser"),
    User        = require("./models/user"),
    methodOverride = require("method-override");

    // DATABASEURL is an environment variable containing a 
    // db string set locally in C9 and set separately in Heroku. 
    // Locally we need to start the mongod  process, on Heroku we 
    // utilize a cloud mongoDB cluster.
// export DATABASEURL=mongodb://localhost/olob_blog **** to set locally****
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "aolob forever",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to pass user to every route
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// ====================
// AUTH ROUTES
// ====================

// show register form
app.get("/register", function(req, res){
    res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to AOLob " + req.body.username + "!!");
            res.redirect("/");
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login");
});

// handle login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login",
    }), function(req, res){
            
});

// Logout route
app.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have successfully logged out.");
    res.redirect("/");
});

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

// New post create page
app.get("/new", isLoggedIn, function(req, res){
  res.render("new"); 
});

// New post - post route
app.post("/new", isLoggedIn, function(req, res){
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

// SHOW ROUTE - show the edit post page
app.get("/:id/edit", isLoggedIn, function(req, res){
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
app.delete("/:id", isLoggedIn, function(req, res){
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
});

// HAMMERTIME ROUTE
app.get("/hammertime", function(req, res){
   res.render("hammertime"); 
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first.");
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("OLOB server is up and running!")
});