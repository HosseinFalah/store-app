const { Schema, model, model } = require("mongoose");

const UserSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true},
    phone: { type: String },
    email: { type: String, lowercase: true},
    password: { type: String },
    otp: { type: Object, default: { code: 0, expires: 0 } },
    bills: { type: [], default: []},
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    Rolse: { type: [String], default: ["USER"]}
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;