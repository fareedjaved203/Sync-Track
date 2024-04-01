import React, { useRef } from "react";
import { Socket } from "socket.io-client";
import { FiUsers } from "react-icons/fi";
import { FaRegWindowClose } from "react-icons/fa";

const Sidebar = ({ users, user, socket }) => {
  const sideBarRef = useRef(null);

  const openSideBar = () => {
    sideBarRef.current.style.left = 0;
  };
  const closeSideBar = () => {
    sideBarRef.current.style.left = -100 + "%";
  };
  return (
    <>
      <button
        className="btn btn-dark btn-sm"
        onClick={openSideBar}
        style={{
          position: "absolute",
          top: "15%",
          left: "2%",
        }}
      >
        Active Users
      </button>
      <div
        className="position-fixed pt-2 bg-dark"
        ref={sideBarRef}
        style={{
          width: "150px",
          left: "-100%",
          height: "100vh",
          transition: "0.3s linear",
          zIndex: "9999",
        }}
      >
        <button
          className="btn btn-block border-0 form-control rounded-0 btn-light"
          onClick={closeSideBar}
        >
          <FaRegWindowClose />
        </button>
        <div className="w-100 mt-5">
          {users.map((usr, index) => (
            <p key={index} className="text-white text-center py-2">
              {usr.username}
              {usr.id === socket.id && " - (You)"}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
