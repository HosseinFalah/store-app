const { Schema, model, model, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
    title: { type: mongoose.Types.ObjectId, required: true },
    short_desc: { type: String, required: true },
    total_desc: { type: String, required: true },
    images: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    deslike: { type: [mongoose.Types.ObjectId], default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true},
    time: { type: String },
    format: { type: String },
    teacher: { type: mongoose.Types.ObjectId, required: true },
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