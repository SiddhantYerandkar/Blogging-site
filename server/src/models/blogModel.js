const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: "Author",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('blog', blogSchema)