const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const static = require('koa-static');
const router = require('./router/Index');
// const path = require('path');

const app = new Koa();
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

// default link to static/html
// app.use(static(path.join(__dirname, './static')));

module.exports = app;
!module.main && app.listen(3000);
