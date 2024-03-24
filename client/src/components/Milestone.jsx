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
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="flex justify-content-end w-full">
          <AddMilestoneModal
            channel={channel}
            isUpdated={isUpdated}
            update={update}
          />
        </div>
        {milestone.map((item) => (
          <div className="container px-5 py-8 mx-auto" key={item?._id}>
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <>
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      {item?.title}
                    </span>
                    <span className="mt-1 text-gray-500 text-sm">
                      {item?.startDate}
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      {item?.title}
                    </h2>
                    <p className="leading-relaxed mb-4">{item?.description}</p>
                    <UpdateMilestoneModal
                      channel={item}
                      update={update}
                      isUpdated={isUpdated}
                      id={channel?._id}
                    />
                    <button
                      type="button"
                      className="timeline-delete-btn inline-block rounded ml-3 p-3 py-1 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      data-twe-ripple-init
                      onClick={() => removeMilestone(item?._id)}
                    >
                      Remove
                    </button>
                  </div>
                </>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Milestone;
