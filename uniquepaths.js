/**There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109 */

/*
[Recursion & Memo]
The number of possible paths from grid[row][col] to the bottom-right 
= the number of possible paths from grid[row][col+1] + the number of possible paths from grid[row+1][col]

1. We will use DFS to traverse every possible path starting at (0,0). The function dfs() will be called
recursively until the bottom-right (where row = height-1, col = width-1) is reached. 
- Once the bottom-right is reached, 1 is returned because it means there is a path.
- If invalid row or col index is given, 0 will be returned. 
- If given row and col have already been visited, the result will be returned from this memoization table.
- If given row and col are valid, not bottom-right, unvisited position, we will call dfs one to the right and one to the bottom, add these results, record it to our memoization table and return it.

We will use a m x n 2-d array for a memoization table.
*/


var uniquePaths = function(m, n) {
  let memo = new Array(m).fill(0).map(() => new Array(n));
  return dfs(0, 0, m, n, memo);
  // T.C: O(M * N), M = # of rows, N = # of columns
  // S.C: O(M * N)
};

// Returns the number of possible paths from given (row,col) to the bottom-right
function dfs(row, col, height, width, memo) {
  // invalid index
  if (row < 0 || row >= height || col < 0 || col >= width) {
      return 0;
  }
  // the right-bottom is reached
  if (row === height-1 && col === width-1) {
      return 1;
  }
  if (memo[row][col] !== undefined) {
      return memo[row][col];
  }
  let res = dfs(row, col+1, height, width, memo) + dfs(row+1, col, height, width, memo);
  memo[row][col] = res;
  return res;
}
/*
[DP]
The number of paths from (row,col) to the bottom-right 
= the number of paths from (row, col+1) + the number of paths from (row+1, col).

Hence, we will create a m x n dp table; dp[row][col] is the number of paths from given row and column to the bottom-right.
We know that every entry in row=m-1 and every entry in col=n-1 will have a value of 1 because we can only move right or down. So, all these will be our base cases.

So we will traverse the grid backwards and fill our dp table.

The answer will be dp[0][0] since we want to figure out the number of paths from (0,0) to the bottom-right.
*/
var uniquePaths = function(m, n) {
  let dp = new Array(m).fill(0).map(() => new Array(n));
  for (let row = m-1; row >= 0; row--) {
      for (let col = n-1; col >= 0; col--) {
          if (row === m-1 || col === n-1) {
              dp[row][col] = 1;
          } else {
              dp[row][col] = dp[row][col+1] + dp[row+1][col];
          }
      }
  }
  return dp[0][0];
  // T.C: O(M*N)
  // S.C: O(M*N)
};