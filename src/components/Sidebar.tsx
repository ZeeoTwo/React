import React from "react";
import Dropdown from "./DropDown";
import { RouteObject } from "react-router-dom";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  routes: RouteObject[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, routes }) => {
  return (
    <div
      className={`w-54 sidebar fixed inset-y-0 left-0 z-50 rounded-r-lg bg-white font-semibold text-gray-800 shadow-lg ${
        isOpen ? "visible" : ""
      }`}
      onClick={(e) => {
        if ((e.target as Element).classList.contains("sidebar")) {
          onClose();
        }
      }}
    >
      <div className="p-4 text-center">
        <nav>
          <ul className="mt-4 flex flex-grow flex-col">
            {routes.map((route, id) => (
              <div key={id}>
                {route.children ? (
                  <Dropdown routes={route.children} path={route.path} />
                ) : (
                  <li>
                    <a
                      className="block p-1 py-2 hover:rounded-lg hover:bg-gray-100"
                      href={route.path}
                    >
                      {route.path?.substring(1)
                        ? route.path?.substring(1)
                        : "Home"}
                    </a>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
