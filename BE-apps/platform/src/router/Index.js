const Router = require('@koa/router');
const UserRouter = require('./User.js');

const router = new Router();

router.use('/user', UserRouter.routes(), UserRouter.allowedMethods());

router.get('koa-example', '/', async (ctx) => {
  const html = `
    <h1 style="text-align:center">Hello my Koa Router</h1>
  `;
  ctx.body = html;
});

module.exports = router;
