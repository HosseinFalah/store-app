const { default: mongoose, model } = require("mongoose");

const RoleSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    permissions: { type: [mongoose.Types.ObjectId], ref: "Permission", default: []}
}, {
    toJSON: { virtuals: true }
});

const RoleModel = model('Role', RoleSchema);

module.exports = RoleModel;