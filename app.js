var express = require("express");
var app     = express();

app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.get("/", function(req, res){
    res.render("home");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("OLOB server is up and running!")
});