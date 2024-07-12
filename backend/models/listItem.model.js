const mongoose = require('mongoose')

const listItemSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model("ListItem", listItemSchema)