var mongoose    = require("mongoose");

// Create the post Schema
var postSchema = new mongoose.Schema({
    title: String,
    body: String,
    name: String,
    image: String,
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Compile into a model (using above Schema) that allows the use of methods (.find(), .create())
var Post = mongoose.model("Post", postSchema);

module.exports = mongoose.model("Post", postSchema);