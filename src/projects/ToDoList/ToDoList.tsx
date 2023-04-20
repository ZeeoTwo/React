import React, { useRef, useState } from "react";

const ToDoList: React.FC = () => {
  const input = useRef<HTMLInputElement>(null);
  const [task, setTask] = useState<string[]>([]);
  const handleClick = () => {
    if (input.current) {
      setTask([...task, input.current.value]);
      input.current.value = "";
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className=" m-1 mt-5 flex justify-center">
        <input placeholder="Task you want to add" type="text" ref={input} />
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleClick}
          className=" rounded-md bg-slate-300 p-1 shadow-md shadow-black"
        >
          Add Task
        </button>
      </div>
      <div className=" mt-6 flex justify-center">
        <ul>
          {task.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ToDoList;
