const mongoose = require('mongoose');
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const schema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String }
})

module.exports = mongoose.model('Item', schema);