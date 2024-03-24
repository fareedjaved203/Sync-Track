import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdEditDocument } from "react-icons/md";
import UpdateProjectModal from "./channel/UpdateProjectModal";

const ProjectOverview = ({ channel }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(channel?.name);
    setDescription(channel?.description);
  }, []);

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-3xl font-bold mb-2">Project: {name}</h1>
            <UpdateProjectModal
              channel={channel}
              setName={setName}
              setDescription={setDescription}
            />
          </div>
          <h4 className="text-lg flex items-center justify-start mb-4">
            <span className="text-gray-700">
              <b>Role:</b>
            </span>{" "}
            {channel?.users?.map(
              (val, index) =>
                val.user === user.data?.user?._id && (
                  <div key={index} className="text-gray-700 ml-3">
                    {val.role}
                  </div>
                )
            )}
          </h4>

          <div className="bg-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-1">Project Description:</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectOverview;
