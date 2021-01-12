const mongoose = require('mongoose');
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    body: { type: String }
   
}, {
    timestamps: true
})

module.exports = mongoose.model('Article', schema);