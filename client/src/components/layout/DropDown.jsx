import React from "react";

const DropDown = () => {
  return (
    <div className="z-1 absolute top-0 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
          hover:text-gray-900"
          role="menuitem"
        >
          {" "}
          Logout
        </div>
      </div>
    </div>
  );
};

export default DropDown;
