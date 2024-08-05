export function isDateValid(startDate?: string, endDate?: string, targetDate?: string, closedDay: string = '1111111'): boolean {
  if (!targetDate) {
    return true
  }
  const closedDateSign = Number(`0b${closedDay}`)
  const currentDaySign = 1 << (6 - new Date(targetDate).getDay())
  const isClosed = (closedDateSign & currentDaySign) === 0
  if (isClosed) {
    return false
  }
  if (!startDate || !endDate) {
    return true
  }
  const extractMonthDay = (dateStr: string): string => {
    return dateStr.split('-').slice(1).join('-')
  }

  const startMonthDay = extractMonthDay(startDate)
  const endMonthDay = extractMonthDay(endDate)
  const targetMonthDay = extractMonthDay(targetDate)

  if (startMonthDay <= endMonthDay) {
    return startMonthDay <= targetMonthDay && targetMonthDay <= endMonthDay
  }
  else {
    return targetMonthDay >= startMonthDay || targetMonthDay <= endMonthDay
  }
}
