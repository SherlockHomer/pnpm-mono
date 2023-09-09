const app = require('../src/index');
const server = app.listen();

const request = require('supertest').agent(server);

describe('index', function () {
  after(function () {
    server.close();
  });

  it('should show the static html', function (done) {
    // todo: add should OR chai
    request.get('/').expect(200);
    done();
  });
});
