import { Tabs } from "antd";
import TaskCard from "./TaskCard"; // Assuming TaskCard component is in a separate file
import TaskList from "./TaskList"; // Assuming TaskList component is in a separate file

const { TabPane } = Tabs;

const TaskViewOptions = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab="Card View" key="card">
        <TaskCard />
      </TabPane>
      <TabPane tab="List View" key="list">
        <TaskList />
      </TabPane>
    </Tabs>
  );
};

export default TaskViewOptions;
