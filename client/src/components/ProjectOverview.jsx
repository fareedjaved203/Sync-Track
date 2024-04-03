import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdEditDocument } from "react-icons/md";
import UpdateProjectModal from "./channel/UpdateProjectModal";
import Team from "./Team";
import Progress from "./Progress";

const ProjectOverview = ({ channel }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(channel?.name);
    setDescription(channel?.description);
  }, [channel]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col md:flex-row md:items-center">
          <div className="md:w-3/4 mb-6 md:mb-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 relative">
                Project: {name}
                <span className="absolute top-10 bottom-0 left-0 h-1 w-20 mt-2 bg-blue-500"></span>
              </h1>
              {channel?.creator == user.data?.user?._id && (
                <>
                  <UpdateProjectModal
                    channel={channel}
                    setName={setName}
                    setDescription={setDescription}
                  />
                </>
              )}
            </div>
            <div className="mb-6">
              <h4 className="text-lg text-gray-700 mb-2">
                <span className="font-semibold">Role:</span>
              </h4>
              <div className="flex flex-wrap items-center">
                {channel?.users?.map(
                  (val, index) =>
                    val.user === user.data?.user?._id && (
                      <div
                        key={index}
                        className="bg-green-600 text-white rounded-full px-3 py-1 mr-2 mb-2"
                      >
                        {val.role}
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-400 pb-2">
                Project Description
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          <div className="md:w-2/4 md:pl-6">
            <img
              src="https://static.vecteezy.com/system/resources/previews/002/955/669/original/man-avatar-on-computer-in-video-chat-design-free-vector.jpg"
              alt="Project Image"
              className="w-100"
            />
          </div>
        </div>
      </div>

      <Progress />
      <Team channel={channel} />
    </div>
  );
};

export default ProjectOverview;
