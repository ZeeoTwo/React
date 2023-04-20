interface Props {
  val: string;
}

const DisplayCol = (props: Props) => {
  const { val } = props;

  function splitExpression(expression: string) {
    let operators = ["+", "-", "*", "/", "%", "(", ")"];
    let result: string[] = [];
    let buffer = "";
    for (let i = 0; i < expression.length; i++) {
      let c = expression.charAt(i);
      if (operators.includes(c)) {
        if (buffer !== "") {
          result.push(buffer);
          buffer = "";
        }
        result.push(c);
      } else {
        buffer += c;
      }
    }
    if (buffer !== "") {
      result.push(buffer);
    }
    return result;
  }

  return (
    <div className="DisplayCol flex justify-center">
      <div className="m-2 h-auto w-[200px] rounded-lg border border-black border-opacity-50 bg-slate-100 shadow-xl">
        <div className="my-4 flex flex-col items-center text-xl">
          {splitExpression(val).map((line, index) => {
            return (
              <div key={index} className="mb-3">
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayCol;
