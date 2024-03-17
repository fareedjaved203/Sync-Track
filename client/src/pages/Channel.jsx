import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Button, Tabs } from "antd";
import AddUser from "../components/AddUser";
import Timeline from "../components/Timeline";
import Milestone from "../components/Milestone";
import Task from "../components/Task";

const items = [
  { label: "Timeline", key: "1", children: <Timeline /> },
  { label: "Milestone", key: "2", children: <Milestone /> },
  { label: "Task", key: "3", children: <Task /> },
  { label: "Standups", key: "4", children: "Content of Standups" },
  { label: "Announcements", key: "5", children: "Content of Announcements" },
];

const Channel = () => {
  const operations = <AddUser />;

  return (
    <MainLayout>
      <div className="p-4 m-4 mt-1 pt-1">
        <Tabs tabBarExtraContent={operations} items={items} />
      </div>
    </MainLayout>
  );
};

export default Channel;
