const generateApp = require('./app')
const { webServiceMount } = require("../services");
const allowCORS = ['http://www.guaiguaizhanhao.cn', 'http://guaiguaizhanhao.cn', 'http://127.0.0.1:10000', 'http://localhost:10000']
generateApp(3000, webServiceMount, allowCORS)