import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return window.alert("Please Enter Your Name");

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
    if (!joinName) return window.alert("Please Enter Your Name");

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
    <div className="container mx-auto">
      <div className="row">
        <div className="col">
          <h1 className="text-center my-5 text-3xl">
            Welcome To Realtime Whiteboard Sharing App
          </h1>
        </div>
      </div>
      <div className="row mx-5 mt-5">
        <div className="col-md-5 p-5 border mx-auto">
          <h1 className="text-center text-primary mb-5 text-2xl">
            Create Room
          </h1>
          <form onSubmit={handleCreateSubmit} className="my-2">
            <input
              type="text"
              placeholder="Name"
              className="form-input my-2 block w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex my-2 items-center border">
              <input
                type="text"
                className="form-input border-0 outline-none w-full"
                value={roomId}
                readOnly={true}
                style={{
                  boxShadow: "none",
                  zIndex: "0 !important",
                  fontSize: "0.89rem !important",
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary border-0 btn-sm"
                  type="button"
                  onClick={() => setRoomId(uuid())}
                >
                  Generate
                </button>
                <CopyToClipboard
                  text={roomId}
                  onCopy={() => console.log("copied")}
                >
                  <button
                    className="btn btn-outline-dark border-0 btn-sm"
                    type="button"
                  >
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <button
              type="submit"
              className="form-input btn btn-dark mt-5 block w-full"
            >
              Create Room
            </button>
          </form>
        </div>
        <div className="col-md-5 p-5 border mx-auto">
          <h1 className="text-center text-primary mb-5 text-2xl">Join Room</h1>
          <form onSubmit={handleJoinSubmit} className="my-2">
            <input
              type="text"
              placeholder="Name"
              className="form-input my-2 block w-full"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
            />
            <input
              type="text"
              className="form-input my-2 block w-full"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              placeholder="Room Id"
              style={{
                boxShadow: "none",
              }}
            />
            <button
              type="submit"
              className="form-input btn btn-dark mt-5 block w-full"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateRoom;
