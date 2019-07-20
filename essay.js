const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content: {
        type: String,
        required: true,
    },

    deadline: {
        type: Integer, 
        required: true, 
    },
       status: {
        type: Boolean, 
        required: true,
            default: false,
    },

    wordcount: {
        type: Integer,
        required: true,
    },

});

const schema = new Schema({
    school: {
        type: String,
        required: true,
    },
 question: [questionSchema],

  prompt: [{
        type: String,
        required: true,
        enum: ['required', 'optional'],
    }],

    personalStatement: [questionSchema],
}); 

module.exports = mongoose.model('User', schema);