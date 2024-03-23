import React from "react";
import UpdateTaskModal from "./channel/UpdateTaskModal";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import ShowTaskDetailsModal from "./channel/showTaskdetailsModal";
import AddTaskModal from "./channel/AddTaskModal";

const Task = () => {
  const handleStatusChange = (e) => {
    // Logic to handle status change
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="w-full flex justify-content-end">
        <AddTaskModal />
      </div>
      <div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/3">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 py-4 rounded-lg overflow-hidden text-center relative">
              <div className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                Raclette Blueberry Nextious Level
              </div>
              <p className="leading-relaxed mb-3">
                {/* Brief description */}
                Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                microdosing tousled waistcoat...
              </p>
              {/* Task status */}
              <div className="mb-3 relative">
                <label
                  htmlFor="status"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  onChange={handleStatusChange}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-info-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Task assigned to */}
              <div className="mb-3">
                <label
                  htmlFor="assignedTo"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-info-500"
                >
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                  <option value="user3">User 3</option>
                </select>
              </div>

              {/* Update and Remove buttons */}
              <UpdateTaskModal />
              <button
                type="button"
                className="inline-block bg-red-500 rounded p-1 px-2 ml-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-red-500 hover:text-white focus:outline-none focus:bg-red-600 focus:text-white"
              >
                Remove
              </button>
              <button
                type="button"
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-info-600 transition duration-300 ease-in-out"
              >
                Send Reminder
              </button>
              <ShowTaskDetailsModal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Task;
