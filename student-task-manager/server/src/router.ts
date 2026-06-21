import { os } from '@orpc/server';

export const healthCheck = os.handler(async () => ({
  ok: true,
  timestamp: new Date().toISOString(),
}));

export const router = os.router({
  health: {
    check: healthCheck,
  },
});
