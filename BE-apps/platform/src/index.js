const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticKoa = require('koa-static');
const router = require('./router/Index');
const path = require('path');

const app = new Koa();
app.use(bodyParser());

// default link to static/html
app.use(staticKoa(path.join(__dirname, '../../../FE-apps/react-3d/build')));

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
!module.main && app.listen(3000);
