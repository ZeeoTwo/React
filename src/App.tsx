import { useState } from "react";
import Sidebar from "./components/Sidebar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import RandomDataAxios from "./projects/RandomDataAxios/RandomDataAxios";
import Lines from "./projects/InterviewChallenges/Lines/Lines";
import Calculator from "./projects/Calculator/Calculator";
import PokemonView from "./projects/Pokemon/components/PokemonView";
import ToDoList from "./projects/ToDoList/ToDoList";
import Zadanie from "./projects/Zadanie/Zadanie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Calculator",
    element: <Calculator></Calculator>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Pokemon",
    element: <PokemonView></PokemonView>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/RandomDataAxios",
    element: <RandomDataAxios></RandomDataAxios>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/InterviewChallenges",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/InterviewChallenges/Lines",
        element: <Lines></Lines>,
      },
    ],
  },
  {
    path: "/ToDoList",
    element: <ToDoList></ToDoList>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Zadanie",
    element: <Zadanie></Zadanie>,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      key={"App"}
      className={`${
        isOpen
          ? "flex pl-[224px] transition-all duration-300"
          : "flex transition-all duration-300"
      } bg-slate-800`}
    >
      <div className="flex h-[100vh] items-center">
        <button
          onClick={handleToggleSidebar}
          className="absolute left-0 top-1/2 h-[140px] w-[25px] -translate-y-1/2 transform rounded-r-2xl bg-gray-700"
        ></button>
        <Sidebar
          isOpen={isOpen}
          onClose={handleToggleSidebar}
          routes={router.routes}
        />
      </div>
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
