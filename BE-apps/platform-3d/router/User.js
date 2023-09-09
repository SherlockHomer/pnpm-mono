const Router = require('@koa/router');

const UserRouter = new Router();

UserRouter.get('/info', (ctx) => {
  let cookies = ctx.cookies;
  const email = cookies.get('email') || '';
  let html = `
    <h1 style="text-align:center;white-space:break-spaces">
      Opps, your infomation is fucked up\n
      Your email is ${email}\n
      and we will find you!🔪
    </h1>
  `;
  if (email) {
    ctx.body = html;
  } else {
    ctx.body = `
      <h2>hello you there, welcome</h2>
      <a href="./login">login</a>
    `;
  }
});

UserRouter.get('/login', (ctx) => {
  let cookies = ctx.cookies;
  const email = cookies.get('email') || '';

  let html = `
    <h1>koa2 login</h1>
    <form method="POST" action="/user/login">
      <p>nickName</p>
      <input name="nickName" /><br/>
      <p>email</p>
      <input name="email" value="${email}" /><br/>
      <button type="submit">submit</button>
    </form> 
  `;
  ctx.body = html;
}).post('/login', (ctx) => {
  const email = ctx.request.body.email || '';
  ctx.cookies.set('email', email, {
    maxAge: 10 * 60 * 1000,
  });
  ctx.redirect('/user/info');
});

module.exports = UserRouter;
