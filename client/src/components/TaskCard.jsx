import UpdateTaskModal from "./channel/UpdateTaskModal";
import ShowTaskDetailsModal from "./channel/showTaskdetailsModal";
import AddTaskModal from "./channel/AddTaskModal";
import ReminderModal from "./channel/ReminderModal";

const TaskCard = ({ channel, change, setChange, removeTask, tasks, user }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="w-full flex justify-content-end">
        <AddTaskModal change={change} setChange={setChange} channel={channel} />
      </div>
      <div>
        <div className="flex flex-wrap -m-4">
          {tasks &&
            tasks?.map((task) => (
              <div className="p-4 lg:w-1/3" key={task?._id}>
                <div className="h-full bg-gray-100 bg-opacity-75 px-8 py-4 rounded-lg overflow-hidden text-center relative">
                  <div className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    {task?.name}
                  </div>
                  <p className="leading-relaxed text-gray-700 mb-3">
                    {task?.description}
                  </p>
                  <div className="flex items-center mb-3 space-x-4">
                    <div className="text-gray-600 font-semibold">Status:</div>
                    <div className="text-green-600 font-semibold">
                      {task?.status}
                    </div>
                    <div className="text-gray-600 font-semibold">Priority:</div>
                    <div className="text-yellow-600 font-semibold">
                      {task?.priority}
                    </div>
                  </div>

                  <div className="text-gray-700 mb-3">
                    <span className="text-gray-600 font-semibold">
                      Assigned to:
                    </span>{" "}
                    {task?.assigned_to}
                  </div>

                  <UpdateTaskModal
                    task={task}
                    channel={channel}
                    change={change}
                    setChange={setChange}
                  />
                  {user.data?.user?._id == channel?.creator && (
                    <>
                      <button
                        type="button"
                        className="inline-block bg-red-500 rounded p-1 px-2 ml-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-red-500 hover:text-white focus:outline-none focus:bg-red-600 focus:text-white"
                        onClick={() => removeTask(task)}
                      >
                        Remove
                      </button>
                      <ReminderModal
                        channel={channel}
                        task={task}
                        user={user}
                      />
                    </>
                  )}

                  <span className="pl-2">
                    <ShowTaskDetailsModal task={task} />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TaskCard;
