import React, { useState, useEffect } from "react";
import { getUserDetailsApi } from "../../api/user/userApi";
import { useParams } from "react-router-dom";

const Testimonials = () => {
  const params = useParams();
  console.log(params);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getRatings = async () => {
      const ratings = await getUserDetailsApi(params?.user);
      const filteredData = ratings.data.user.channels.flatMap((channel) => {
        return channel.users
          .filter((user) => {
            return params.user == user.user.email;
          })
          .map((user) => {
            return {
              ...user,
              channelName: channel.name,
              projectManager: {
                name: channel.users[0].user.name,
                avatar: channel.users[0].user.avatar.url,
              },
            };
          });
      });

      setData(filteredData);

      console.log(filteredData);
    };
    getRatings();
  }, []);
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
            <h3 className="mb-6 text-3xl font-bold text-neutral-800 pb-6">
              Reviews
            </h3>
          </div>

          <div className="grid gap-6 text-center md:grid-cols-3 lg:gap-12">
            {data.map((user, index) => (
              <div className="mb-12 md:mb-0" key={index}>
                <div className="mb-6 flex justify-center">
                  <img
                    src={user.projectManager?.avatar}
                    className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/30 object-cover"
                  />
                </div>

                <h5 className="mb-4 text-xl font-semibold">
                  {user?.projectManager?.name}
                </h5>
                <h6 className="mb-4 font-semibold text-primary dark:text-primary-500">
                  Project Manager
                </h6>
                <p className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="inline-block h-7 w-7 pr-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                  </svg>
                  {user.feedback}
                </p>
                <ul className="mb-0 flex items-center justify-center">
                  {Array.from({ length: user.rating }, (_, i) => (
                    <li key={i}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div class="flex justify-center items-center w-full h-full">
          <div class="text-lg font-bold text-gray-700 p-4 rounded-lg">
            No Reviews Yet
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonials;
