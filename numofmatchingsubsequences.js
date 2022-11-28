/**Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
 */

var numMatchingSubseq = function(s, words) {
  let count = 0
  for(let w of words){
    if(findSubsequence(s, w)) count++
  }
  return count
};
  
function findSubsequence(s, w){
  let idx = -1
  for(const c of w){
    const found = s.indexOf(c, idx+1)
    if(found == -1) return false
    idx = found
  }
  return true
}