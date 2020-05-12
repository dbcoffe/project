const classApi = require('./api/classApi');
const vip = require('./api/vip');
const staff = require('./api/staff');
const login = require('./api/login');
const user = require('./api/user');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/class', classApi);
app.use('/api/login', login);
app.use('/api/vip', vip);
app.use('/api/staff',staff);
app.use('/api/user',user);

// 监听端口
app.listen(3000);

console.log('success listen at port:3000......');
