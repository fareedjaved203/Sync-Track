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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Project: {name}
            </h1>
            <UpdateProjectModal
              channel={channel}
              setName={setName}
              setDescription={setDescription}
            />
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
                      className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 mr-2 mb-2"
                    >
                      {val.role}
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Project Description:
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
      <Progress />
      <Team channel={channel} />
    </div>
  );
};

export default ProjectOverview;
