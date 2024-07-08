const { Schema, model, model } = require("mongoose");

const SliderSchema = new Schema({
    title: { type: String },
    text: { type: String },
    image: { type: String, required: true },
    type: { type: String, default: "main"}
});

const SliderModel = model('Slider', SliderSchema);

module.exports = SliderModel;