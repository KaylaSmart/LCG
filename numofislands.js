/** Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

*/

var numIslands = function(grid) {
  let islands = 0;

  for(let r = 0; r < grid.length; r++) {
      for(let c = 0; c < grid[0].length; c++) {
          if(grid[r][c] === '1') {
              islands++;
              callDFS(r, c);
          }
      }
  }
  
  function callDFS(r, c) {
      if(r < 0 || r >= grid.length || grid[r][c] !== '1') return;
      grid[r][c] = '0';
      
      callDFS(r+1, c); // down
      callDFS(r-1, c); // up
      callDFS(r, c+1); // right
      callDFS(r, c-1); // left
  }
  return islands;
};