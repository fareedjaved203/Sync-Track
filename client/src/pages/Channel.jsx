import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Button, Tabs } from "antd";
import AddUser from "../components/AddUser";
import Timeline from "../components/Timeline";
import Milestone from "../components/Milestone";
import Task from "../components/Task";
import Team from "../components/Team";
import ProjectOverview from "../components/ProjectOverview";
import { myChannelApi } from "../api/channel/channelApi";
import { useParams } from "react-router-dom";
import StandUps from "../components/StandUps";
import Announcements from "../components/Announcements";

const Channel = () => {
  let { id } = useParams();
  const [channel, setChannel] = useState([]);
  useEffect(() => {
    const getChannel = async () => {
      const data = await myChannelApi(id);
      setChannel(data.data.channels);
      console.log(data);
    };
    getChannel();
  }, [id]);
  const operations = <AddUser />;
  const items = [
    {
      label: "Overview",
      key: "7",
      children: <ProjectOverview channel={channel} />,
    },
    { label: "Timeline", key: "1", children: <Timeline /> },
    { label: "Milestone", key: "2", children: <Milestone /> },
    { label: "Tasks", key: "3", children: <Task /> },
    { label: "Standups", key: "4", children: <StandUps /> },
    { label: "Announcements", key: "5", children: <Announcements /> },
    { label: "Team", key: "6", children: <Team /> },
  ];

  return (
    <MainLayout>
      <div className="p-4 m-4 mt-1 pt-1">
        <Tabs tabBarExtraContent={operations} items={items} />
      </div>
    </MainLayout>
  );
};

export default Channel;
