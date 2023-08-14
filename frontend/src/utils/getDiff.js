import { DateTime } from 'luxon'

export default function getDiff(d1, d2) {
  const date1 = DateTime.fromISO(d1)
  const date2 = DateTime.fromISO(d2)

  const diff = date1.diff(date2, ['months', 'days', 'hours']).toObject()

  return diff
}
