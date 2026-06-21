import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { RPCHandler } from '@orpc/server/fetch';
import { router } from './router.js';

const app = new Hono();

const handler = new RPCHandler(router);

app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/rpc',
  });
  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});

app.get('/', (c) => c.text('Student Task Manager Server'));

const port = 3000;
console.log(`Server running at http://localhost:${port}`);

serve({ fetch: app.fetch, port });
