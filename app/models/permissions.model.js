const { default: mongoose, model } = require("mongoose");

const permissionSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    description: { type: String, default: "" }
}, {
    toJSON: { virtuals: true }
});

const PermissionModel = model("Permission", permissionSchema);

module.exports = PermissionModel;