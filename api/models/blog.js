const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogTitle: {type: String, required: true},
    blogAuthor:{type: String, required: true},
    blogDate:{type: Date, required: true},
    blogDesc:{type: String, required: true},
    blogImage:{type: String, required: true},
    url:{type: String}
})
module.exports = mongoose.model('Blog', blogSchema);