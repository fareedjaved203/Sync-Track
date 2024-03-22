import { useSelector } from "react-redux";

const ProjectOverview = ({ channel }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Project Name: {channel?.name}
          </h1>
          <h4 className="text-lg flex items-center justify-center mb-4">
            <span className="text-gray-700">
              {" "}
              <b>Role:</b>{" "}
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
            <h3 className="text-xl font-semibold mb-4">Project Description:</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {channel?.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectOverview;
