const { Schema, model, default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const ProductSchema = new Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    deslikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true}, // virtual - pysici
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, required: true },
    feture: { type: Object, default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madein: ""
    }}
});

const ProductModel = model('Product', ProductSchema);

module.exports = ProductModel;