/**Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.
 Time Complexity: O(n^2)
Space Complexity: O(n)

Intuition

As we iterate through the words to form a line, we need to keep track of two things:

How much space is left in that line
The words we've used so far in the line
For the space left, we can start with the maxWidth and decrease it by the length of any newly added word and the space needed to separate it from the previous word. We can use an array to keep track of the words added so far to the line and perform a simple join operation later on to construct the line with a space between each word. If a new word would cause the line to exceed the maxWidth, we can justify the existing line and start a new line with that word.

The tricky part comes from figuring out how to justify a line. If a line only has a single word, it's treated like the final line in which the word is left justified and any remaining space is added to the end. If there's more than one word, we'll need to iteratively add the space remaining to each letter at a time which can be accomplished with a while loop that keeps track of which index in the array of words we should be on in each iteration.

After we exit the for loop, we've finished checking each word, but if the line array still has words in it, we treat it as the final line in which everything needs to be left justified and whatever is left is filled with trailing spaces. We simply join the words with an empty space and add on the difference between maxWidth and the length of the words + the spaces between them.*/


var fullJustify = function(words, maxWidth) {
  const res = [];
  let line = [words[0]];
// spaceLeft will keep track of the trailing space left after
// accounting for both the length of the words and the spaces between them
  let spaceLeft = maxWidth - words[0].length;
  
  for (let i = 1; i < words.length; i++) {
      // Only add a new word to the line if
      // there's enough space for it and the 
      // space before it.
      const word = words[i];
      if (spaceLeft >= word.length + 1) {
          line.push(word);
          spaceLeft -= (word.length + 1);
      } else {
    // There's not enough space left for the word
    // and the space before it.  Justify the existing
    // line and start a new line with the word.
          res.push(justifyLine(line, spaceLeft));
          line = [word];
          spaceLeft = maxWidth - word.length;
      }
  }
  
  // We've added the final word but there's still space 
  // left. In this case, we justify the line left and add
  // all the left over space to the end of the line.
  if (line.length) {
      let lastLine = line.join(' ');
      lastLine += ' '.repeat(maxWidth - lastLine.length);
      res.push(lastLine);
  }
  
  return res;
};

const justifyLine = (line, spaceLeft) => {
  // Remember, if there's only a single word, it's treated
// as being left justified so all the spaces are added to the end
if (line.length === 1) {
      return line[0] + ' '.repeat(spaceLeft);
  }
  
  // The total amount of spacing will be the spaces
  // between words and the space left. Since we can let
  // the join operation take care of the spaces between
  // words, we only need to add the space left.
  let i = 0;
  while (spaceLeft > 0) {
      line[i] += ' ';
      // We don't want to add a space to the final word
      // so when we reach it, we loop back to the start
      i = (i + 1) % (line.length - 1);
      spaceLeft--;
  }
  
  return line.join(' ');
};