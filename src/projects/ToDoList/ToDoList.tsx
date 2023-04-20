import React, { useRef, useState } from "react";
import List from "./components/List";

const ToDoList: React.FC = () => {
  const input = useRef<HTMLInputElement>(null);
  const [taskList, setTask] = useState<JSX.Element[]>([]);
  const handleClick = () => {
    const value: string = input.current?.value ?? "";
    const list = <List name={value}></List>;
    setTask((prevList) => [...prevList, list]);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className=" m-1 mt-5 flex justify-center">
        <input
          className="rounded-md text-center"
          placeholder="Name of the Task List"
          type="text"
          maxLength={20}
          ref={input}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleClick}
          className=" rounded-md bg-slate-300 p-1 pl-2 pr-2 shadow-md shadow-black hover:shadow-sm hover:shadow-black active:bg-slate-500"
        >
          Add TaskList
        </button>
      </div>
      <div className=" mt-6 flex flex-wrap justify-center">
        {taskList.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};
export default ToDoList;
