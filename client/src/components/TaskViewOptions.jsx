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
import { postNotificationApi } from "../api/notifications/notificationsApi";

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

  const removeTask = async (task) => {
    const data = await deleteTaskApi(task._id);
    console.log(data);
    setChange(!change);
    const formData = new FormData();
    formData.append("type", "deletion");
    formData.append(
      "description",
      "Your Task is deleted by the project manager"
    );
    formData.append("project", channel?.name);
    formData.append("sender", user.data.user.email);
    formData.append("receiver", task?.assigned_to);
    const notification = await postNotificationApi(formData);
    console.log(notification);
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
