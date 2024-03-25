import { useState, useEffect } from "react";
import { getAllStandUpsApi, postStandUpApi } from "../api/standup/standUpApi";
import { useSelector } from "react-redux";
import { message } from "antd";

const StandUps = ({ channel }) => {
  const { user } = useSelector((state) => state.user);
  const [msg, setMsg] = useState("");
  const [update, isUpdated] = useState(false);
  const [standup, setStandUps] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const postStandUp = async () => {
    const standupData = new FormData();
    standupData.append("description", msg);
    standupData.append("user", user.data?.user?.email);
    standupData.append("project", channel?._id);
    const standup = await postStandUpApi(standupData);
    messageApi.success("StandUp Posted Successfully");
    isUpdated(!update);
    setMsg("");
  };

  useEffect(() => {
    const getAllStandUps = async () => {
      const data = await getAllStandUpsApi(channel?._id);
      setStandUps(data?.data?.standup);
    };
    getAllStandUps();
  }, [update, channel]);
  return (
    <>
      {contextHolder}
      <div className="bg-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4">All StandUps</h2>
        <div className="flex flex-col space-y-4">
          {standup.map((item) => (
            <div className="bg-white p-4 rounded-lg shadow-md" key={item?._id}>
              <h3 className="text-lg font-bold">{item?.user}</h3>
              <p className="text-gray-700 text-sm mb-2">
                Posted on April 17, 2023
              </p>
              <p className="text-gray-700">{item?.description}</p>
            </div>
          ))}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Add your standup</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Comment
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="comment"
                rows="3"
                placeholder="Enter your comment"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              ></textarea>
            </div>
            <button
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#2E2E30" }}
              onClick={postStandUp}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StandUps;
