const { Schema, default: mongoose } = require("mongoose");

const CommentSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: new Date().getTime() },
    parent: { type: mongoose.Types.ObjectId, ref: "Comment" }
});

module.exports = {
    CommentSchema
}