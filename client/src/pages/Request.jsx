import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { userResponseApi } from "../api/channel/channelApi";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Request = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const requestResponse = async (response) => {
    const formData = new FormData();
    formData.append("request", response);
    console.log(user.data.user._id);
    const data = await userResponseApi(id, user?.data?.user?._id, formData);
    console.log(data);
    navigate("/");
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-8 sm:px-4 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                Project Request
              </h2>
              <h4 className="text-center text-2xl font-extrabold text-gray-900">
                Devsinc
              </h4>
              <div className="mt-8">
                <div className="mt-6">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="w-1/2 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => requestResponse("accepted")}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="w-1/2 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => requestResponse("rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Request;
