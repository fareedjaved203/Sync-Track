import React, { useState, useEffect } from "react";
import UpdateMilestoneModal from "./channel/UpdateMilestoneModal";
import AddMilestoneModal from "./channel/AddMilestoneModal";
import {
  deleteMilestoneApi,
  getMilestoneApi,
} from "../api/milestone/milestoneApi";

const Milestone = ({ channel }) => {
  const [update, isUpdated] = useState(false);
  const [milestone, setMilestone] = useState([]);

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
      <section className="text-gray-600 body-font overflow-hidden bg-gray-100">
        <div className="flex justify-end w-full px-5 py-4">
          <AddMilestoneModal
            channel={channel}
            isUpdated={isUpdated}
            update={update}
          />
        </div>
        {milestone.map((item) => (
          <div key={item?._id} className="container px-5 py-4 mx-auto">
            <div className="-my-4 divide-y-2 divide-gray-200">
              <div className="py-4 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-4 flex-shrink-0 flex flex-col">
                  <h2 className="text-xl font-medium text-gray-900 title-font mb-2">
                    {item?.title}
                  </h2>
                  <span className="mt-1 text-sm text-gray-600">
                    {item?.startDate}
                  </span>
                </div>
                <div className="md:flex-grow">
                  <p className="leading-relaxed mb-4">{item?.description}</p>
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Milestone;
