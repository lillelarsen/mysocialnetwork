const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String },
    posts: [
        {
            id: {type: String},
            text: {type: String},
            date: {type: Date}, 
            likes: [
                {
                    userid: {type: String}
                }
            ]
        }
    ]
});

module.exports = User;
