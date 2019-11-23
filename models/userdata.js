'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
    survey:{
        type: Schema.Types.ObjectId,
        ref: 'Survey'
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

class UserDataClass{


}

UserDataSchema.loadClass(UserDataClass);
module.exports = mongoose.model('UserData', UserDataSchema)