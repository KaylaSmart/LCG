/*Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, and /. Each operand may be an integer or another expression.

Note that division between two integers should truncate toward zero.

It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, 
and there will not be any division by zero operation.*/

/*var evalRPN = function(tokens) {
    let stack = [];
    for (token of tokens ){
      if(token === "+") stack.push(stack.pop()+ stack.pop())
      if(token === "-")
      if(token === "*")
      if(token === "/")
    }
};*/

let a, b
const evaluate = {
  "+": ()=>a+b, 
  "-": ()=>a-b, 
  "*": ()=>a*b, 
  "/": ()=>~~(a/b)
}

var evalRPN = function(tokens) {
    let stack = []
    for (let t of tokens) {
        if (evaluate[t]) {
            b = stack.pop(), a = stack.pop()
            stack.push(evaluate[t]())
        } else stack.push(~~t)
    }
    return stack[0]
};