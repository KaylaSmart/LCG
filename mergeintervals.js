/**Given an array of intervals where intervals[i] = [starti, endi], 
 * merge all overlapping intervals, and return an array of the 
 * non-overlapping intervals that cover all the intervals in the input. */


 var merge = function(intervals) {
  // first make sure array is sorted according to start time of each interval
  intervals.sort((a, b) => a[0] - b[0]);
  
  let i = 0;
  
  while (i < intervals.length - 1) {
      const [_, firstRight] = intervals[i];
      const [secondLeft, secondRight] = intervals[i + 1];
      
      if (firstRight >= secondLeft) {
          // merge first with second
          intervals[i][1] = Math.max(firstRight, secondRight);
          // remove second
          intervals.splice(i + 1, 1);
      } else {
          // move on; this grouping is done
          i++;
      }
  }
  
  return intervals;
};