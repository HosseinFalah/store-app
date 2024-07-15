const { Schema, model, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
    title: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category", default: undefined }
}, {
    id: false,
    toJSON: {
        virtuals: true
    }
});
CategorySchema.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent'
});

function autoPopulate(next) {
    this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
    next();
};

CategorySchema.pre('findOne', autoPopulate).pre('find', autoPopulate);

const CategoryModel = model('Category', CategorySchema);

module.exports = CategoryModel;