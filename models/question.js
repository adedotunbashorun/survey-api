'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question1: { type: String, required: true },
    question2: { type: String, required: true },
    question3: { type: String, required: true },
    question4: { type: String, required: true },
    question5: { type: String, required: true },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userdata: {
        type: Schema.Types.ObjectId,
        ref: 'UserData'
    }
}, { timestamps: true });

class QuestionClass{

}

QuestionSchema.loadClass(QuestionClass);
module.exports = mongoose.model('Question', QuestionSchema)