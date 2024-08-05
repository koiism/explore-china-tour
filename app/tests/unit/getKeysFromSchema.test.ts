import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { getKeysFromSchema } from '~/utils/getKeysFromSchema'

// Mock schema for testing
const schema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
})

describe('getKeysFromSchema', () => {
  it('should return an array of keys from the schema', () => {
    const keys = getKeysFromSchema(schema)
    expect(keys).toEqual(['name', 'age', 'email'])
  })

  it('should return an empty array for an empty schema', () => {
    const emptySchema = z.object({})
    const keys = getKeysFromSchema(emptySchema)
    expect(keys).toEqual([])
  })

  // Add more test cases as needed
})
