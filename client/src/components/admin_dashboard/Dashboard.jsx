import {
  DollarOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

const Dashboard = ({ data }) => {
  console.log(data);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <DollarOutlined style={{ fontSize: "50px" }} />
                <h2 className="title-font font-medium text-3xl text-gray-900 mt-1">
                  46
                </h2>
                <p className="leading-relaxed">Revenue</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <UserOutlined style={{ fontSize: "50px" }} />
                <h2 className="title-font font-medium text-3xl text-gray-900 mt-1">
                  {data?.length}
                </h2>
                <p className="leading-relaxed">Users</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <ProjectOutlined style={{ fontSize: "50px" }} />
                <h2 className="title-font font-medium text-3xl text-gray-900 mt-1">
                  72
                </h2>
                <p className="leading-relaxed">Free Projects</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <ProjectOutlined style={{ fontSize: "50px" }} />
                <h2 className="title-font font-medium text-3xl text-gray-900 mt-1">
                  46
                </h2>
                <p className="leading-relaxed">Paid Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
