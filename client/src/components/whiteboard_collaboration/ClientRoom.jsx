import { useEffect, useRef } from "react";
import { message } from "antd";

const ClientRoom = ({ userNo, socket, setUsers, setUserNo }) => {
  const imgRef = useRef(null);

  const [messageApi, contextHolder] = message.useMessage();

  const messageAlert = (msg) => {
    messageApi.info(msg);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      messageAlert(data.message);
    });
  }, []);
  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);
  useEffect(() => {
    socket.on("canvasImage", (data) => {
      imgRef.current.src = data;
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row pb-2">
        <h1 className="display-5 pt-4 pb-3 text-center">
          Sync Track - users online:{userNo}
        </h1>
      </div>
      <div className="row mt-5">
        <div
          className="col-md-8 overflow-hidden border border-dark px-0 mx-auto
          mt-3"
          style={{ height: "500px" }}
        >
          <img className="w-100 h-100" ref={imgRef} src="" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ClientRoom;
