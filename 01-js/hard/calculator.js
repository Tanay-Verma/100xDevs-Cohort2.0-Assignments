/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }
  clear() {
    this.result = 0;
  }
  add(num) {
    this.result += num;
  }
  subtract(num) {
    this.result -= num;
  }
  multiply(num) {
    this.result *= num;
  }
  divide(num) {
    if(num === 0) throw new Error("Division by Zero")
    this.result /= num;
  }
  calculate(expression) {
    // removing the blank spaces
    expression = expression.replaceAll(" ", "");
    // checking if the expression has any alphabets or not
    if (/[a-zA-Z]/.test(expression)) throw new Error("Invalid Expression");
    // converting the Infix expression to Postfix
    function infixToPostfix(infixExpression) {
      function getPrecedence(operator) {
        switch (operator) {
          case "+":
          case "-":
            return 1;
          case "*":
          case "/":
            return 2;
          default:
            return 0; // For operands or other characters
        }
      }

      function isDigit(char) {
        return /\d/.test(char);
      }

      let postfix = "";
      let stack = [];

      for (let i = 0; i < infixExpression.length; i++) {
        let token = infixExpression[i];

        if (isDigit(token)) {
          // If the current token is a digit, keep scanning for the entire number
          let number = token;
          while (
            i + 1 < infixExpression.length &&
            (isDigit(infixExpression[i + 1]) || /\./.test(infixExpression[i+1]))
          ) {
            number += infixExpression[++i];
          }
          postfix += number + "|";
        } else if (/[+\-*/]/.test(token)) {
          // Operator
          while (
            stack.length > 0 &&
            getPrecedence(stack[stack.length - 1]) >= getPrecedence(token)
          ) {
            postfix += stack.pop();
          }
          stack.push(token);
        } else if (token === "(") {
          // Left parenthesis
          stack.push(token);
        } else if (token === ")") {
          // Right parenthesis
          while (stack.length > 0 && stack[stack.length - 1] !== "(") {
            postfix += stack.pop();
          }
          if(stack.length === 0) throw new Error("No left parenthesis in the expression");
          stack.pop(); // Pop the left parenthesis
        }
        else{
          throw new Error("Invalid Infix Expression")
        }
      }

      // Pop any remaining operators from the stack
      while (stack.length > 0) {
        if(stack[stack.length-1] === "(") throw new Error("No right parenthesis in the expression");
        postfix += stack.pop();
      }
      return postfix;
    }
    // ecaluating the Postfix expression
    function evaluatePostfix(postfixExpression) {
      let stack = [];
    
      for (let i = 0; i < postfixExpression.length; i++) {
        let token = postfixExpression[i];
    
        if (/\d/.test(token)) {
          // If the token is a digit, push it onto the stack
          let number = token;
          while (
            i + 1 < postfixExpression.length &&
            postfixExpression[i+1] !== "|"
          ) {
            number += postfixExpression[++i];
          }
          /./.test(number) ? stack.push(parseFloat(number)):stack.push(parseInt(number, 10));
        } else if (/[+\-*/]/.test(token)) {
          // If the token is an operator, pop operands from the stack, perform the operation, and push the result back
          let operand2 = stack.pop();
          let operand1 = stack.pop();
    
          switch (token) {
            case '+':
              stack.push(operand1 + operand2);
              break;
            case '-':
              stack.push(operand1 - operand2);
              break;
            case '*':
              stack.push(operand1 * operand2);
              break;
            case '/':
              if(operand2 === 0) throw new Error("Division by zero");
              stack.push(operand1 / operand2);
              break;
          }
        }
      }
    
      // The final result should be on the stack
      return stack.pop();
    }

    const postfixExpression = infixToPostfix(expression);
    const result = evaluatePostfix(postfixExpression);
    this.result = result;
  }
  getResult() {
    return this.result;
  }
}

module.exports = Calculator;
