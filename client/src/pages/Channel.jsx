import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Button, Tabs } from "antd";
import AddUser from "../components/AddUser";
import Timeline from "../components/Timeline";
import Milestone from "../components/Milestone";
import Team from "../components/Team";
import ProjectOverview from "../components/ProjectOverview";
import { myChannelApi } from "../api/channel/channelApi";
import { useParams } from "react-router-dom";
import StandUps from "../components/StandUps";
import Announcements from "../components/Announcements";
import TaskViewOptions from "../components/TaskViewOptions";
import Progress from "../components/Progress";

const Channel = () => {
  let { id } = useParams();
  const [channel, setChannel] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getChannel = async () => {
      const data = await myChannelApi(id);
      setChannel(data?.data?.channels);
    };
    getChannel();
  }, [id]);
  const operations = <AddUser />;

  useEffect(() => {
    setItems([
      {
        label: "Overview",
        key: "7",
        children: <ProjectOverview channel={channel} />,
      },
      { label: "Timeline", key: "1", children: <Timeline channel={channel} /> },
      {
        label: "Milestone",
        key: "2",
        children: <Milestone channel={channel} />,
      },
      {
        label: "Tasks",
        key: "3",
        children: <TaskViewOptions channel={channel} />,
      },
      { label: "Standups", key: "4", children: <StandUps channel={channel} /> },
      {
        label: "Announcements",
        key: "6",
        children: <Announcements channel={channel} />,
      },
      { label: "Team", key: "8", children: <Team channel={channel} /> },
    ]);
  }, [channel]);

  return (
    <MainLayout>
      <div className="p-4 m-4 mt-1 pt-1">
        <Tabs tabBarExtraContent={operations} items={items} />
      </div>
    </MainLayout>
  );
};

export default Channel;
