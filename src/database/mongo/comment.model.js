const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment