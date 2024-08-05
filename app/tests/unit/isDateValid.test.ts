import { describe, expect, it } from 'vitest'
import { isDateValid } from '~/utils/isDateValid'

describe('isDateValid', () => {
  it('should return true if start and or dates are not provided', () => {
    const targetDate = '2021-06-15'
    expect(isDateValid(undefined, undefined, targetDate)).toBe(true)
  })

  it('should return false if start and or dates are not provided and is on a closed day', () => {
    const targetDate = '2021-06-15'
    expect(isDateValid(undefined, undefined, targetDate, '0000000')).toBe(false)
  })

  it('should return true when targetDate is on a closed day', () => {
    expect(isDateValid('2022-01-01', '2022-01-31', '2022-01-02', '0111111')).toBe(false)
  })

  it('should return true if target date is between start and end dates', () => {
    const startDate = '2021-01-01'
    const endDate = '2021-12-31'
    const targetDate = '2021-06-15'
    expect(isDateValid(startDate, endDate, targetDate)).toBe(true)
  })

  it('should return false if target date is before start date', () => {
    const startDate = '2021-06-01'
    const endDate = '2021-06-30'
    const targetDate = '2021-05-15'
    expect(isDateValid(startDate, endDate, targetDate)).toBe(false)
  })

  it('should return false if target date is after end date', () => {
    const startDate = '2021-01-01'
    const endDate = '2021-06-30'
    const targetDate = '2021-07-15'
    expect(isDateValid(startDate, endDate, targetDate)).toBe(false)
  })

  it('should return true if start date is after end date and target date is in the correct range', () => {
    const startDate = '2022-01-01'
    const endDate = '2021-12-31'
    const targetDate = '2021-11-15'
    expect(isDateValid(startDate, endDate, targetDate)).toBe(true)
  })

  it('should return false if end month is before start month and target date is in the range', () => {
    const startDate = '2020-06-01'
    const endDate = '2021-01-31'
    const targetDate = '2022-03-15'
    expect(isDateValid(startDate, endDate, targetDate)).toBe(false)
  })
})
