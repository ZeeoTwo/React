import React, { useState } from "react";
import { RouteObject } from "react-router-dom";

interface DropdownProps {
  routes: Array<RouteObject>;
  path: string | undefined;
}

const Dropdown: React.FC<DropdownProps> = ({ routes, path }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <button
        key={"Button"}
        onClick={handleToggleDropdown}
        className="self-center px-2 py-2 hover:rounded-lg hover:bg-gray-100"
      >
        <div className="flex items-center">
          <img
            src={"/assets/icons/right-arrow.png"}
            width={20}
            className={`arrow-transition mr-1 ${
              isOpen ? "rotate-90" : ""
            } transition-transform duration-300 ease-in-out`}
            alt=""
          />
          <span>{path?.substring(1)}</span>
        </div>
      </button>
      {routes.map((route, index) => (
        <div
          key={index}
          className={`${
            isOpen ? " visible h-10 opacity-100" : "invisible h-0 opacity-0"
          } transition-all duration-300 ease-in-out`}
        >
          <a
            href={route.path}
            className="block p-1 py-2 hover:rounded-lg hover:bg-gray-100"
          >
            {route.path?.replace(path + "//".substring(1), "")}
          </a>
        </div>
      ))}
    </li>
  );
};

export default Dropdown;
