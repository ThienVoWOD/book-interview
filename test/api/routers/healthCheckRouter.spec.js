const app = require('../../../src/app')
const apiProxyKey = process.env.API_PROXY_KEY;

describe( 'healthCheck', () => {
  let APP = null
  beforeAll( async ( ) => {
    return app( ( app ) => {
      APP = app
    })
  })
  it('should get a health check', async () => {
    const response = await APP.inject({
      method: "GET",
      url: "/health-check",
      headers: { "x-api-key": apiProxyKey },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data).toBe("OK");
  })

  it('missing x-api-key in headers', async () => {
    const response = await APP.inject({
      method: "GET",
      url: "/health-check",
    });

    expect(response.statusCode).toBe(403);
    expect(response.body).toBe("Forbidden");
  })
} );
