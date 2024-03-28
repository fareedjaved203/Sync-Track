import { useEffect, useState } from "react";
import { Tabs } from "antd";
import TaskCard from "./TaskCard";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import { getAllTasksApi, getMyTasksApi } from "../api/task/taskApi";

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
        setTasks(data?.data);
        console.log(data);
      }
    };
    getTasks();
  }, [channel]);

  const removeTask = (id) => {};
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {}, []);

  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab="Card View" key="card">
        <TaskCard
          channel={channel}
          change={change}
          setChange={setChange}
          removeTask={removeTask}
          tasks={tasks}
        />
      </TabPane>
      <TabPane tab="List View" key="list">
        <TaskList
          channel={channel}
          change={change}
          setChange={setChange}
          removeTask={removeTask}
          tasks={tasks}
        />
      </TabPane>
    </Tabs>
  );
};

export default TaskViewOptions;
