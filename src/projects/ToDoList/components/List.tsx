import { useEffect, useRef, useState } from "react";
import "../styles/List.css";
import axios from "axios";

interface ListProps {
  name: string;
}
type Task = {
  value: string;
  id: number;
  priority: 0 | 1 | 2 | 3; // 0 - Done | 1 - Low Priority | 2 - Mid Priority | 3 - High Priority
};

const List: React.FC<ListProps> = ({ name }) => {
  const input = useRef<HTMLInputElement>(null);
  const inputEdit = useRef<HTMLInputElement>(null);

  const inputFile = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  const handleClick = () => {
    const value = input.current?.value || "";
    const task: Task = { value, priority: 1, id: tasks.length + 1 };
    if (value === "") {
      return;
    }
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:12000/api/data");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendData = async (data: { id: number; image: string | undefined }) => {
    try {
      const res = await axios.post("http://localhost:12000/api/data", data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = (index: number) => {
    setTasks((prevTask) => {
      const updatedTaskList = [...prevTask];
      updatedTaskList[index].priority = 0;
      updatedTaskList.sort((a, b) => b.priority - a.priority);
      return updatedTaskList;
    });
  };
  const handlePriorityChange = (index: number) => {
    setTasks((prevTaskList) => {
      const updatedTaskList = [...prevTaskList];
      const currentPriority = updatedTaskList[index].priority;
      let newPriority: 1 | 2 | 3;
      if (currentPriority === 1) {
        newPriority = 3;
      } else if (currentPriority === 2) {
        newPriority = 1;
      } else {
        newPriority = 2;
      }
      updatedTaskList[index].priority = newPriority;
      updatedTaskList.sort((a, b) => b.priority - a.priority);
      return updatedTaskList;
    });
  };

  const handleEdit = (index: number) => {
    setEditingTaskIndex(index);
  };

  const handleEditChange = (index: number, value: string) => {
    setTasks((prevTasks) => {
      const updatedTaskList = [...prevTasks];
      updatedTaskList[index].value = value;
      return updatedTaskList;
    });
  };

  const handleEditSave = (index: number, value: string) => {
    setEditingTaskIndex(null);
    handleEditChange(index, value);
  };

  const saveImageToDatabase = (image: File, id: number) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Image = reader.result?.toString().split(",")[1];
      try {
        sendData({ id: id, image: base64Image });
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  useEffect(() => {
    if (editingTaskIndex !== null && inputEdit.current) {
      inputEdit.current.focus();
    }
  }, [editingTaskIndex]);
  useEffect(() => {
    if (selectedImage) {
      saveImageToDatabase(selectedImage, tasks.length);
    }
  }, [selectedImage]);

  return (
    <div className="m-2 border border-dashed p-4">
      <h1 className="mb-2 text-center text-gray-300">{name}</h1>
      <div>
        <input
          className="rounded-md text-center"
          type="text"
          placeholder="Task"
          ref={input}
          max={20}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleClick}
          className="rounded-md bg-slate-300 p-1 pl-2 pr-2 shadow-md shadow-black hover:shadow-sm hover:shadow-black active:bg-slate-500"
        >
          Add Task
        </button>
        <label className="ml-3 cursor-pointer rounded-md bg-slate-500 p-0.5 pl-2 pr-2 shadow-md shadow-black hover:shadow-sm hover:shadow-black active:bg-slate-700">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            ref={inputFile}
          />
          File
        </label>
      </div>
      <div className="mt-2 text-center text-gray-300 ">
        <ul>
          {tasks.map((task, index) => (
            <div
              key={index}
              className="relative mt-2 flex items-center justify-center"
            >
              {editingTaskIndex === index ? (
                <input
                  type="text"
                  className=" w-3/5 rounded-md border border-gray-300 text-center"
                  value={task.value}
                  ref={inputEdit}
                  onChange={(e) => handleEditChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const inputElement = e.target as HTMLInputElement;
                      handleEditSave(index, inputElement.value);
                    }
                  }}
                />
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => handleEdit(index)}
                >
                  {task.value}
                </span>
              )}
              <button
                onClick={() => {
                  handlePriorityChange(index);
                }}
                className="absolute right-0 cursor-pointer"
              >
                {task.priority === 1 && (
                  <img
                    src={"assets/icons/low-priority.png"}
                    className="low w-7"
                  ></img>
                )}
                {task.priority === 2 && (
                  <img
                    src={"assets/icons/medium-priority.png"}
                    className="mid w-7"
                  ></img>
                )}
                {task.priority === 3 && (
                  <img
                    src={"assets/icons/high-priority.png"}
                    className="high w-7"
                  ></img>
                )}
                {task.priority === 0 && (
                  <img
                    src={"assets/icons/task-completed.png"}
                    className="done w-7"
                  ></img>
                )}
              </button>
              <button
                onClick={() => {
                  handleComplete(index);
                }}
                className="absolute left-0 cursor-pointer"
              >
                {task.priority ? (
                  <img src={"assets/icons/checkbox.png"} className="w-7"></img>
                ) : (
                  <img className=""></img>
                )}
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default List;
