import { useSelector } from "react-redux";

const ProjectOverview = ({ channel }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">
          Project Name: {channel?.name}
        </h1>
        <h4 className="text-lg mb-2 flex ">
          Role:{" "}
          {channel?.users?.map(
            (val, index) =>
              val.user === user.data?.user?._id && (
                <div key={index} className="text-gray-700 ml-3">
                  {val.role}
                </div>
              )
          )}
        </h4>

        <h3 className="text-xl font-semibold mb-4">
          Project Description: {channel?.description}
        </h3>
      </div>
    </>
  );
};

export default ProjectOverview;
