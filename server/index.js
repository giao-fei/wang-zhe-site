const express = require('express');

const app = express();

// 生成token的密钥，全局保持唯一的
app.set('secret', '1dsdf23lkx3slfsfie')

app.use(express.json());
app.use(require('cors')());
app.use('/uploads', express.static(__dirname + '/uploads'));

require('./plugins/db')(app);
require('./routes/admin')(app);
require('./routes/web')(app);

app.listen(3000, () => {
    console.log('http://localhost:3000');
})