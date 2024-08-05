import type { z } from 'zod'

export function getKeysFromSchema(schema: z.ZodObject<any, any>): (keyof z.infer<typeof schema>)[] {
  const shape = schema.shape

  const keys: (keyof z.infer<typeof schema>)[] = Object.keys(shape) as any

  return keys
}
