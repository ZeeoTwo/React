import React from "react";

interface Props {
  onUpdate: (value: string) => void;
}

const Keypad: React.FC<Props> = ({ onUpdate }) => {
  const handleClick = (value: string) => {
    onUpdate(value);
  };

  return (
    <div className="KeyPad flex justify-center">
      <div className="m-2 h-[350px] w-[400px] rounded-lg border border-black border-opacity-50 bg-slate-100 shadow-xl">
        <div className="m-6 grid grid-cols-4 gap-7">
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("(")}
          >
            (
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick(")")}
          >
            )
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("%")}
          >
            %
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("/")}
          >
            /
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("7")}
          >
            7
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("8")}
          >
            8
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("9")}
          >
            9
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("*")}
          >
            *
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("4")}
          >
            4
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("5")}
          >
            5
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("6")}
          >
            6
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("-")}
          >
            -
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("1")}
          >
            1
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("2")}
          >
            2
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("3")}
          >
            3
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("+")}
          >
            +
          </button>
          <div></div>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("0")}
          >
            0
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("C")}
          >
            C
          </button>
          <button
            className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
            onClick={() => handleClick("=")}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Keypad;
