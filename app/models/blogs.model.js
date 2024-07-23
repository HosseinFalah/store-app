const { Schema, model, default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const BlogSchema = new Schema({
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: [mongoose.Types.ObjectId], ref: "Category", required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    deslikes: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], ref: "users", default: [] }
}, { 
    timestamps: true, 
    versionKey: false,
    toJSON: {
        virtuals: true
    }
});

BlogSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: 'author'
});

BlogSchema.virtual('category_detail', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'category'
});

const BlogModel = model('Blog', BlogSchema);

module.exports = BlogModel;