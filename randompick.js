
/**You are given a 0-indexed array of positive integers w where w[i] describes the weight of the ith index.

You need to implement the function pickIndex(), which randomly picks an index in the range [0, w.length - 1] (inclusive) and returns it. The probability of picking an index i is w[i] / sum(w).

For example, if w = [1, 3], the probability of picking index 0 is 1 / (1 + 3) = 0.25 (i.e., 25%), and the probability of picking index 1 is 3 / (1 + 3) = 0.75 (i.e., 75%).
 */

var Solution = function(w) {
  this.arr = [];
  let sum = 0;
  for(let i=0; i<w.length; i++) {
      sum += w[i];
      this.arr.push(sum);
  }
};

/**
* @return {number}
*/
Solution.prototype.pickIndex = function() {
  let target = Math.random() * this.arr[this.arr.length-1];
  
  let low = 0;
  let high = this.arr.length - 1;
  while (low < high) {
      let mid = Math.floor(low + ((high-low)/2));
      if(this.arr[mid] <= target)
          low = mid + 1;
      else 
          high = mid;
  }
  return high;    
};