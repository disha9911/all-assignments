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
  - `npm run test-calculator`
*/

class Calculator {
    constructor() {
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
        if (num === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        this.result /= num;
    }

    clear() {
        this.result = 0;
    }

    getResult() {
        return this.result;
    }

    calculate(expression) {
        // Remove continuous spaces and split the expression into tokens
        const tokens = expression.replace(/\s+/g, '').match(/(\d+|\+|\-|\*|\/|\(|\))/g);
        if (!tokens) {
            throw new Error("Invalid expression.");
        }

        const stack = [];
        const operators = [];
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };

        for (const token of tokens) {
            if (!isNaN(token)) {
                stack.push(parseFloat(token));
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length && operators[operators.length - 1] !== '(') {
                    this.applyOperator(stack, operators.pop());
                }
                operators.pop(); // Pop the '('
            } else if (token in precedence) {
                while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                    this.applyOperator(stack, operators.pop());
                }
                operators.push(token);
            } else {
                throw new Error("Invalid expression.");
            }
        }

        while (operators.length) {
            this.applyOperator(stack, operators.pop());
        }

        if (stack.length !== 1 || operators.length !== 0) {
            throw new Error("Invalid expression.");
        }

        this.result = stack.pop();
    }

    applyOperator(stack, operator) {
        if (stack.length < 2) {
            throw new Error("Invalid expression.");
        }
        const b = stack.pop();
        const a = stack.pop();
        switch (operator) {
            case '+':
                stack.push(a + b);
                break;
            case '-':
                stack.push(a - b);
                break;
            case '*':
                stack.push(a * b);
                break;
            case '/':
                if (b === 0) {
                    throw new Error("Division by zero is not allowed.");
                }
                stack.push(a / b);
                break;
        }
    }
}

// Example usage
const calculator = new Calculator();
try {
    calculator.calculate("10 +   2 *    (   6 - (4 + 1) / 2) + 7");
    console.log("Result:", calculator.getResult()); // Output: 21
} catch (error) {
    console.error(error.message);
}


}

module.exports = Calculator;
