/**An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:

'A': Absent.
'L': Late.
'P': Present.
Any student is eligible for an attendance award if they meet both of the following criteria:

The student was absent ('A') for strictly fewer than 2 days total.
The student was never late ('L') for 3 or more consecutive days.
Given an integer n, return the number of possible attendance records of length n that make a student eligible for an attendance award. The answer may be very large, so return it modulo 109 + 7. */

const memo = (fn) => {
  const map = new Map()
  return (...args) => {
    const key = JSON.stringify(args)
    if (map.has(key)) return map.get(key)
    return map.set(key, fn(...args)).get(key)
  }
}

const checkCanBeAbsent = absences => absences < 1
const tooManyAbsences = absences => absences >= 2

const checkCanBeLate = lates => lates < 2
const tooManyLates = lates => lates >= 3

const checkRecord = memo((n, totalAbsences = 0, consecutiveLates = 0) => {
  const canBeAbsent = checkCanBeAbsent(totalAbsences)
  const canBeLate = checkCanBeLate(consecutiveLates)

  if (tooManyLates(consecutiveLates)) return 0
  if (tooManyAbsences(totalAbsences)) return 0
  if (n === 1) return canBeAbsent && canBeLate ? 3 
    : canBeAbsent || canBeLate ? 2
    : 1
  
  const withLate = checkRecord(n - 1, totalAbsences, consecutiveLates + 1)
  const withAbsent = checkRecord(n - 1, totalAbsences + 1, 0)
  const withPresent = checkRecord(n - 1, totalAbsences, 0)
  
  return (withLate + withAbsent + withPresent) % 1000000007
})