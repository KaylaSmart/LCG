// given the root of a binary tree , collect a trees nodes as if you were doing this:
// Collect all the lead nodes - remove all the leaf nodes - repeat until the tree is empty

// DFS Post order traversal
//use an object Key: depth :value:node


var findLeaves = function(root){
    function dfs(root){
      let res = {};
      if(!root) return 0;
    
    let left = root.left;
    let right = root.right;
    let depth = Math.max(left, right);

  if(!res[depth]){
    res[depth] = [root.val];
  } else{
    res[depth].push(root.val)
  }
  }
  dfs(root);

  return Object.values(res)
}

