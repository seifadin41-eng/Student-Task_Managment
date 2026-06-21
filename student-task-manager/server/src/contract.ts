import { oc } from '@orpc/contract';
import { z } from 'zod';

export const healthContract = oc
  .input(z.object({}))
  .output(z.object({
    ok: z.boolean(),
    timestamp: z.string(),
  }));

export const contract = {
  health: {
    check: healthContract,
  },
};
