import React from "react";
import { message } from "antd";

const Team = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const generatePdf = () => {
    messageApi.success("Certificate generated Successfully");
  };
  return (
    <>
      {contextHolder}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Our Team
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/80x80"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Holden Caulfield
                  </h2>
                  <p className="text-gray-500">UI Designer</p>
                  <div className="flex space-x-1 mt-4">
                    <button
                      className="text-white py-1 px-2 rounded"
                      style={{ backgroundColor: "green" }}
                      onClick={generatePdf}
                    >
                      Conclude
                    </button>
                    <button className="bg-red-600 text-white py-2 px-2 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
