import ReminderModal from "./channel/ReminderModal";
import ShowTaskDetailsModal from "./channel/showTaskdetailsModal";
import UpdateTaskModal from "./channel/UpdateTaskModal";
import AddTaskModal from "./channel/AddTaskModal";

const TaskList = ({ channel, change, setChange, removeTask, tasks, user }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="w-full flex justify-content-end">
        <AddTaskModal change={change} setChange={setChange} channel={channel} />
      </div>
      <div className="flex flex-col items-center">
        {tasks &&
          tasks?.map((task) => (
            <div
              className="w-full max-w-lg m-2 p-2 border rounded-lg shadow-md"
              key={task._id}
            >
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <div className="text-lg font-bold text-gray-800 mb-2">
                    {task?.name}
                  </div>
                  <p className="text-gray-700 text-base mb-4">
                    {task?.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-gray-600">
                      Status:
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {task?.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-gray-600">
                      Priority:
                    </div>
                    <div className="text-sm font-medium text-yellow-600">
                      {task?.priority}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    Assigned to:
                  </div>
                  <div className="text-sm text-gray-700">
                    {task?.assigned_to}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div>
                    <UpdateTaskModal
                      task={task}
                      channel={channel}
                      change={change}
                      setChange={setChange}
                    />

                    {user.data?.user?._id == channel?.creator && (
                      <>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-md focus:outline-none ml-2"
                          onClick={() => removeTask(task)}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                  <div>
                    {user.data?.user?._id == channel?.creator && (
                      <>
                        <span className="mr-2">
                          <ReminderModal
                            channel={channel}
                            task={task}
                            user={user}
                          />
                        </span>
                      </>
                    )}
                    <span>
                      <ShowTaskDetailsModal task={task} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TaskList;
