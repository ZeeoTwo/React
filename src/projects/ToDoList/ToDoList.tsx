import React, { useEffect, useRef, useState } from "react";
import List from "./components/List";
import axios, { AxiosResponse } from "axios";
import { Task } from "./components/List";

type TList = {
  id: number;
  name: string;
};

type dbResponse = {
  lists: TList[];
  tasks: Task[];
};

const ToDoList: React.FC = () => {
  const input = useRef<HTMLInputElement>(null);
  const [taskList, setTaskList] = useState<
    Array<{
      id: number;
      list: JSX.Element | null;
    }>
  >([
    {
      id: 0,
      list: null,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        loadData(data);
      } else {
        console.log("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    const value: string = input.current?.value ?? "";
    const list = <List name={value} id_list={taskList.length}></List>;
    insertList({ name: value });
    console.log(list);
    setTaskList((prevList) => [...prevList, { id: prevList.length, list }]);
  };

  const insertList = async (data: { name: string }) => {
    try {
      const res = await axios.post(
        "http://localhost:12000/api/data/list",
        data
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async (): Promise<dbResponse | null> => {
    try {
      const res = await axios.get<dbResponse>(
        "http://localhost:12000/api/data"
      );
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const loadData = (data: dbResponse) => {
    const groupedTasks: { id_list: number; tasks: Task[] }[] = [];

    data.lists.forEach((list) => {
      const tasksInList = data.tasks.filter((task) => task.id_list === list.id);
      groupedTasks.push({ id_list: list.id, tasks: tasksInList });
    });
    // console.log(groupedTasks);

    groupedTasks.forEach((task) => {
      const sorted = task.tasks.sort((a, b) => b.priority - a.priority);
      const tmp = (
        <List name={""} id_list={task.id_list} initial_tasks={sorted}></List>
      );
      setTaskList((prevTaskList) => [
        ...prevTaskList,
        { id: task.id_list, list: tmp },
      ]);
    });
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
          <div key={index}>{item.list}</div>
        ))}
      </div>
    </div>
  );
};
export default ToDoList;
