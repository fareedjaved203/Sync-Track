import { useEffect, useState } from "react";
import { Tabs } from "antd";
import TaskCard from "./TaskCard";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import {
  deleteTaskApi,
  getAllTasksApi,
  getMyTasksApi,
} from "../api/task/taskApi";

const { TabPane } = Tabs;

const TaskViewOptions = ({ channel }) => {
  const { user } = useSelector((state) => state.user);
  const [change, setChange] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      if (user.data?.user?._id == channel?.creator) {
        const data = await getAllTasksApi(channel?._id);
        setTasks(data?.data);
        console.log(data);
      } else {
        const data = await getMyTasksApi(channel?._id);
        setTasks(data?.data?.tasks);
        console.log(data);
      }
    };
    getTasks();
  }, [channel, change]);

  const removeTask = async (id) => {
    const data = await deleteTaskApi(id);
    console.log(data);
    setChange(!change);
  };
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab="Card View" key="card">
        <TaskCard
          channel={channel}
          change={change}
          setChange={setChange}
          removeTask={removeTask}
          tasks={tasks}
          user={user}
        />
      </TabPane>
      <TabPane tab="List View" key="list">
        <TaskList
          channel={channel}
          change={change}
          setChange={setChange}
          removeTask={removeTask}
          tasks={tasks}
          user={user}
        />
      </TabPane>
    </Tabs>
  );
};

export default TaskViewOptions;
