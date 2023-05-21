import { useEffect, useRef, useState } from "react";
import "../styles/List.css";
import axios from "axios";

interface ListProps {
  name: string | undefined;
  id_list: number;
  initial_tasks?: Task[];
}

export type Task = {
  value: string;
  id: number;
  id_list?: number;
  priority: 0 | 1 | 2 | 3; // 0 - Done | 1 - Low Priority | 2 - Mid Priority | 3 - High Priority
  image: null | string;
};

const List: React.FC<ListProps> = ({ name, id_list, initial_tasks }) => {
  const input = useRef<HTMLInputElement>(null);
  const inputEdit = useRef<HTMLInputElement>(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [inputFile, setInputFile] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (index: number) => {
    setSelectedTaskIndex(index);
    setShowPopup(!showPopup);
  };

  const imageStyle = {
    width: `200px`,
    height: `200px`,
    objectFit: "cover",
  };
  useEffect(() => {
    const tasks: Task[] = initial_tasks ?? [];
    setTasks(tasks);
  }, []);

  const handleClick = async () => {
    const value = input.current?.value || "";
    const task: Task = {
      id: tasks.length + 1,
      id_list,
      value,
      priority: 1,
      image: inputFile,
    };
    if (value === "") {
      return;
    }
    try {
      const res = await insertTask({ task, id_list });

      const t_obj = task;
      console.log(res);
      t_obj.id_list = id_list;
      setTasks((prevTasks) => {
        return [...prevTasks, t_obj];
      });
      togglePopup(tasks.length);
    } catch (err) {
      console.log(err);
    }
  };

  const insertTask = async (data: { task: Task; id_list: number }) => {
    try {
      const res = await axios.post(
        "http://localhost:12000/api/data/task",
        data
      );
      console.log(res.data);
    } catch (err) {
      // console.log(err);
    }
  };

  const editTaskDB = async (
    index: number,
    type?: boolean,
    value?: string | number
  ) => {
    const data: any = { id_task: tasks[index].id, type: type, value: value };

    try {
      const res = await axios.post(
        "http://localhost:12000/api/data/task/update",
        data
      );
    } catch (err) {
      // console.log(err);
    }
  };

  const handleComplete = async (index: number) => {
    try {
      editTaskDB(index, false, 0);
    } catch (err) {
      // console.log(err);
    }

    setTasks((prevTask) => {
      const updatedTaskList = [...prevTask];
      updatedTaskList[index].priority = 0;
      updatedTaskList.sort((a, b) => b.priority - a.priority);
      return updatedTaskList;
    });
  };

  const handlePriorityChange = async (index: number) => {
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

      try {
        editTaskDB(index, false, newPriority);
      } catch (err) {
        // console.log(err);
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

  const handleEditSave = async (index: number, value: string) => {
    setEditingTaskIndex(null);
    handleEditChange(index, value);

    try {
      editTaskDB(index, true, value);
    } catch (err) {
      // console.log(err);
    }
  };

  const convertImage = (image: File | null): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!image) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const encodedString = base64String.split(",")[1]; // remove the data:image/jpeg;base64, prefix
        resolve(encodedString);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(image);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const image = await convertImage(files.item(0));
      setInputFile(image);
    }
  };

  useEffect(() => {
    if (editingTaskIndex !== null && inputEdit.current) {
      inputEdit.current.focus();
    }
  }, [editingTaskIndex]);

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
                <>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleEdit(index)}
                    // onMouseUp={togglePopup}
                  >
                    {task.value}
                  </span>
                  {task.image && (
                    <div onClick={() => togglePopup(index)}>
                      <img
                        src={"assets/icons/image.png"}
                        className=" ml-2 w-7 cursor-pointer"
                      ></img>
                    </div>
                  )}
                  {showPopup &&
                    selectedTaskIndex !== null &&
                    selectedTaskIndex === index && (
                      <div className="modal">
                        <div className="modal-content">
                          <img
                            src={`data:image/jpeg;base64,${task.image}`}
                            className="rounded-lg object-contain"
                          />
                          <button
                            className="modal-close"
                            onClick={() => togglePopup(index)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                </>
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
