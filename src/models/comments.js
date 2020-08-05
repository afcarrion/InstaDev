const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const { Schema, model } = mongoose;
const { ObjectId } = Schema;
const path = require('path');

const commentSchema = new Schema({
    image_id: { type: ObjectId },
    email: { type: String},
    gravatar: { type: String},
    name: { type:String },
    comment: {type: String},
    timestamp: { type: Date, default: Date.now } 
});

module.exports = model('Comment', commentSchema);