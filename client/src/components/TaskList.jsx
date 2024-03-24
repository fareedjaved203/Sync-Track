import React from "react";
import { Select } from "antd";
import ReminderModal from "./channel/ReminderModal";
import ShowTaskDetailsModal from "./channel/showTaskdetailsModal";
import UpdateTaskModal from "./channel/UpdateTaskModal";

const { Option } = Select;

const TaskList = () => {
  const handleStatusChange = (value) => {
    // Logic to handle status change
    console.log(value);
  };

  const handlePriorityChange = (value) => {
    // Logic to handle priority change
    console.log(value);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="w-full flex justify-content-end">
        {/* Add Task Modal Button Goes Here */}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="text-lg font-bold text-gray-800 mb-2">
                Raclette Blueberry Nextious Level
              </div>
              <p className="text-gray-700 text-base mb-4">
                {/* Brief description */}
                Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                microdosing tousled waistcoat...
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="w-1/2">
                  <label
                    htmlFor="status"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <Select
                    defaultValue="pending"
                    style={{ width: "100%" }}
                    onChange={handleStatusChange}
                  >
                    <Option value="pending">Pending</Option>
                    <Option value="completed">Completed</Option>
                  </Select>
                </div>
                <div className="w-1/2 ml-4">
                  <label
                    htmlFor="priority"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Priority
                  </label>
                  <Select
                    defaultValue="low"
                    style={{ width: "100%" }}
                    onChange={handlePriorityChange}
                  >
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                  </Select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="assignedTo"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Assigned To
                </label>
                <Select
                  defaultValue="user1"
                  style={{ width: "100%" }}
                  id="assignedTo"
                >
                  <Option value="user1">User 1</Option>
                  <Option value="user2">User 2</Option>
                  <Option value="user3">User 3</Option>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <UpdateTaskModal />
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md focus:outline-none ml-2">
                    Remove
                  </button>
                </div>
                <div>
                  <span className="mr-2">
                    <ReminderModal />
                  </span>
                  <span>
                    <ShowTaskDetailsModal />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskList;
