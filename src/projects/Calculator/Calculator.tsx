import { useState } from "react";

import Display from "./components/Display";
import DisplayHexadecimal from "./components/DisplayHexadecimal";
import DisplayDecimal from "./components/DisplayDecimal";
import DisplayOctal from "./components/DisplayOctal";
import DisplayBinary from "./components/DisplayBinary";
import Keypad from "./components/Keypad";
import DisplayCol from "./components/DisplayCol";

const Calculator = (): JSX.Element => {
  const [result, setResult] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const validateEquation = (equation: string): boolean => {
    // Define a regex pattern for valid characters
    const validPattern = /^[0-9\+\-\*\/\(\)\=]+$/;

    // Check if the equation contains only valid characters
    if (!validPattern.test(equation)) {
      return false;
    }

    // Check if there are two consecutive operators or a closing bracket after an operator
    if (/[\+\-\*\/]{2}|[\+\-\*\/]\)|[\+\-\*\/]=$/.test(equation)) {
      return false;
    }

    // Check if there is an operator as the first character
    if (/^[\+\-\*\/]/.test(equation)) {
      return false;
    }

    return true;
  };

  const infixToPostfix = (infix: string): string[] => {
    const precedence: { [key: string]: number } = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };
    const stack: string[] = [];
    const postfix: string[] = [];

    for (let i = 0; i < infix.length; i++) {
      const token = infix[i];

      if (!isNaN(parseInt(token))) {
        let j = i;
        let num = "";
        while (j < infix.length && !isNaN(parseInt(infix[j]))) {
          num += infix[j];
          j++;
        }
        postfix.push(num);
        i = j - 1;
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        while (stack[stack.length - 1] !== "(") {
          postfix.push(stack.pop() as string);
        }
        stack.pop();
      } else {
        while (
          stack.length > 0 &&
          stack[stack.length - 1] !== "(" &&
          precedence[token] <= precedence[stack[stack.length - 1]]
        ) {
          postfix.push(stack.pop() as string);
        }
        stack.push(token);
      }
    }

    while (stack.length > 0) {
      postfix.push(stack.pop() as string);
    }

    return postfix;
  };

  const evaluatePostfix = (postfix: string[]): number => {
    const stack: number[] = [];

    for (let i = 0; i < postfix.length; i++) {
      const token = postfix[i];

      if (!isNaN(parseInt(token))) {
        stack.push(parseInt(token));
      } else {
        const b = stack.pop() as number;
        const a = stack.pop() as number;
        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            stack.push(a / b);
            break;
          case "%":
            stack.push(a % b);
            break;
        }
      }
    }

    return stack.pop() as number;
  };

  function handleUpdate(button: string) {
    // Validate the current equation before updating the state

    if (button === "C") {
      setValue("");
      return;
    }

    const newEquation = value + button;
    if (!validateEquation(newEquation)) {
      // console.log('Invalid input!');
      return;
    }
    // If the input is valid, update the state as usual
    if (button === "C") {
      setValue("");
    } else if (button === "=") {
      try {
        const ev = infixToPostfix(value);
        const res = evaluatePostfix(ev);
        setResult(res);
      } catch (error) {
        // console.log(error);
        setResult(NaN);
      }
      setValue("");
    } else {
      setValue(value + button);
    }
  }
  return (
    <div className="Calculator flex items-center justify-center">
      <div className="CalcCol ">
        <Display width={400} height={70} content={value}></Display>
        <DisplayHexadecimal content={result}></DisplayHexadecimal>
        <DisplayDecimal content={result}></DisplayDecimal>
        <DisplayOctal content={result}></DisplayOctal>
        <DisplayBinary content={result}></DisplayBinary>
        <Keypad onUpdate={handleUpdate}></Keypad>
      </div>
      <div className="DisCol right- inset-y-0 flex h-full items-center">
        <DisplayCol val={value}></DisplayCol>
      </div>
    </div>
  );
};
export default Calculator;
