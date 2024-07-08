const { Schema, model, model } = require("mongoose");

const CategorySchema = new Schema({
    title: { type: String, required: true }
});

const CategoryModel = model('Category', CategorySchema);

module.exports = CategoryModel;