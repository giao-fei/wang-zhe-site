const mongoose = require('mongoose');
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const schema = new mongoose.Schema({
    username: { type: String, unique: true},
    password: {
         type: String,
         select: true,
         set(val) {
           return require('bcryptjs').hashSync(val, 10)
         }  
        
    }
   
})

module.exports = mongoose.model('AdminUser', schema);