import React, { useState, useEffect } from "react";
import UpdateMilestoneModal from "./channel/UpdateMilestoneModal";
import AddMilestoneModal from "./channel/AddMilestoneModal";
import {
  deleteMilestoneApi,
  getMilestoneApi,
} from "../api/milestone/milestoneApi";
import { useSelector } from "react-redux";

const Milestone = ({ channel }) => {
  const [update, isUpdated] = useState(false);
  const [milestone, setMilestone] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getTimeline = async () => {
      const data = await getMilestoneApi(channel?._id);
      if (data.data?.milestone[0]?.milestones) {
        const formattedTimelines = data.data.milestone[0].milestones.map(
          (timeline) => ({
            ...timeline,
            startDate: getDate(timeline.startDate),
            endDate: getDate(timeline.endDate),
          })
        );
        setMilestone(formattedTimelines);
      }
    };

    getTimeline();
  }, [update, channel]);

  const getDate = (dateString) => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month.toString().padStart(2, "0")} / ${day
      .toString()
      .padStart(2, "0")} / ${year}`;

    console.log(formattedDate);
    return formattedDate;
  };
  const removeMilestone = async (id) => {
    console.log(id);
    const data = await deleteMilestoneApi(id);
    console.log(data);
    isUpdated(!update);
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <h3 className="ms-3 text-2xl font-bold text-gray-600">
          Project Milestone
        </h3>
        {user.data.user._id == channel.creator && (
          <>
            <div className="flex justify-end w-full px-5">
              <AddMilestoneModal
                channel={channel}
                isUpdated={isUpdated}
                update={update}
              />
            </div>
          </>
        )}
        {milestone.map((item) => (
          <div key={item?._id} className="container px-5 py-4 mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex w-full">
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-2">
                    {item?.title}
                  </h2>
                  <span className="text-sm text-gray-600">
                    {item?.startDate}
                  </span>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {item?.description}
                  </p>
                </div>
                {user?.data?.user?._id == channel?.creator && (
                  <>
                    <div className="flex items-center justify-start">
                      <UpdateMilestoneModal
                        channel={item}
                        update={update}
                        isUpdated={isUpdated}
                        id={channel?._id}
                      />
                      <button
                        type="button"
                        className="ml-3 px-3 py-1 text-sm font-medium text-white uppercase bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-300 ease-in-out"
                        onClick={() => removeMilestone(item?._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="w-full">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/035/514/322/non_2x/project-management-concept-strategy-motivation-and-successful-leadership-analysis-and-development-of-online-marketing-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg"
                  alt="Milestone Image"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Milestone;
