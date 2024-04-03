import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layout/MainLayout";
import { message } from "antd";
import { FaRegCopy } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";

const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
  const user = useSelector((state) => state.user);
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState(user?.data?.user?.name);
  const [joinName, setJoinName] = useState(user?.data?.user?.name);
  const [joinRoomId, setJoinRoomId] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const messageAlert = (msg) => {
    messageApi.error(msg);
  };

  const successMessageAlert = (msg) => {
    messageApi.success(msg);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return messageAlert("Enter Your Name");

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
  };
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return messageAlert("Enter Your Name");

    setUser({
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
  };

  return (
    <>
      <div className="container mt-32">
        {contextHolder}
        <h1 className="text-center my-5 text-3xl">Whiteboard Collaboration</h1>
        <div className="row mx-5 m-5">
          <div className="col-md-5 p-5 mt-2 border mx-auto bg-white">
            <h1 className="text-center text-dark mb-5 text-2xl">Create Room</h1>
            <form onSubmit={handleCreateSubmit}>
              <div className="form-group my-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group my-2 border align-items-center">
                <input
                  type="text"
                  className="form-control border-0 outline-0"
                  value={roomId}
                  readOnly={true}
                  style={{
                    boxShadow: "none",
                    zIndex: "0 !important",
                    fontsize: "0.89rem !important",
                  }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-primary border-0 btn-sm"
                    type="button"
                    onClick={() => setRoomId(uuid())}
                  >
                    <FcProcess
                      style={{ color: "black !important", fontSize: "20px" }}
                    />
                  </button>
                  &nbsp;&nbsp;
                  <CopyToClipboard
                    text={roomId}
                    onCopy={() =>
                      successMessageAlert("Room Id Copied To Clipboard!")
                    }
                  >
                    <button
                      className="btn btn-outline-dark border-0 btn-sm"
                      type="button"
                    >
                      <FaRegCopy />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="form-group mt-5">
                <button
                  type="submit"
                  className="form-control btn btn-dark"
                  style={{ backgroundColor: "#2E2E2E" }}
                >
                  Create Room
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-5 p-5 mt-2 border mx-auto bg-white">
            <h1 className="text-center text-dark mb-5 text-2xl">Join Room</h1>
            <form onSubmit={handleJoinSubmit}>
              <div className="form-group my-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                />
              </div>
              <div className="form-group my-2">
                <input
                  type="text"
                  className="form-control outline-0"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  placeholder="Room Id"
                  style={{
                    boxShadow: "none",
                  }}
                />
              </div>
              <div className="form-group mt-5">
                <button
                  type="submit"
                  className="form-control btn btn-dark"
                  style={{ backgroundColor: "#2E2E2E" }}
                >
                  Join Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinCreateRoom;
