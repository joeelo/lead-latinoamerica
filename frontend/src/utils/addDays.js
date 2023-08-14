export const addDays = (d, numOfDays) => {
  const date = new Date(d)

  if (!isFinite(date)) {
    return false
  }

  return date.setDate(date.getDate() + numOfDays)
}
