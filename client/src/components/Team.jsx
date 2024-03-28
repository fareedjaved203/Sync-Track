import React, { useEffect, useState } from "react";
import { message } from "antd";
import GiveFeedBackModal from "./channel/GiveFeedBackModal";
import { getTeamApi, removeTeamMemberApi } from "../api/team/teamApi";
import { useSelector } from "react-redux";

const Team = ({ channel }) => {
  const { user } = useSelector((state) => state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [change, isChange] = useState(false);
  const [team, setTeam] = useState([]);
  const [projectManager, setProjectManager] = useState("");
  const [show, isShow] = useState(false);
  const generatePdf = () => {
    messageApi.success("Certificate generated Successfully");
  };

  useEffect(() => {
    const myTeam = async () => {
      const data = await getTeamApi(channel?._id);
      const project_manager = data.data?.channels?.users?.find((user) => {
        return user.role === "project manager";
      });
      setProjectManager(project_manager?.user?._id);
      setTeam(data?.data?.channels?.users);
      console.log(data);
    };
    myTeam();
  }, [channel, change]);

  useEffect(() => {
    if (projectManager === user.data.user._id) {
      isShow(true);
    }
  }, [projectManager]);

  const removeMember = async (id) => {
    const data = await removeTeamMemberApi(channel?._id, id);
    isChange(!change);
    console.log(data);
  };
  return (
    <>
      {contextHolder}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Our Team
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            {team?.map((user) => (
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={user?._id}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={user?.user?.avatar?.url}
                  />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">
                      {user?.user?.email}
                    </h2>
                    <p className="text-gray-500">{user?.role}</p>
                    {show &&
                      user?.role !== "project manager" &&
                      user?.status == "working" &&
                      user?.request == "accepted" && (
                        <div className="flex space-x-1 mt-4">
                          <GiveFeedBackModal
                            userId={user?.user?._id}
                            channelId={channel?._id}
                            email={user?.user?.email}
                            generatePdf={generatePdf}
                          />
                          <button
                            className="bg-red-600 text-white py-2 px-2 rounded"
                            onClick={() => removeMember(user?.user?._id)}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
