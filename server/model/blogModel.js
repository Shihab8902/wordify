const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publisherEmail: {
        type: String,
        required: true
    },
    publishDate: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    }
});

const blogCollection = mongoose.model("blogs", blogSchema);

module.exports = blogCollection;