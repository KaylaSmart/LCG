/** Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array*/

var subarraySum = function(nums, k) {
  let map = new Map();
  let sum = 0;
  let count = 0;
  map.set(0,1);
  for (let i=0;i<nums.length;i++) {
      sum += nums[i];
      if (map.has(sum-k)) count += map.get(sum-k);
      map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}