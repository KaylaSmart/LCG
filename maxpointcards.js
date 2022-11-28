/**There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array cardPoints and the integer k, return the maximum score you can obtain. */

var maxScore = function(C, K) {
  let total = 0
  for (let i = 0; i < K; i++) total += C[i]
  let best = total
  for (let i = K - 1, j = C.length - 1; ~i; i--, j--)
      total += C[j] - C[i], best = Math.max(best, total)
  return best
};