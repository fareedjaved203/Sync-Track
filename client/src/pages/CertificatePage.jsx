import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { getTeamUserApi } from "../api/team/teamApi";
import { useParams } from "react-router-dom";

const CertificatePage = ({
  userName = "Fareed Javed",
  achievement = "Team Lead",
}) => {
  const { channelId, userId } = useParams();
  const [user, setUser] = useState([]);
  const [channel, setChannel] = useState();
  useEffect(() => {
    const getUser = async () => {
      const data = await getTeamUserApi(channelId, userId);
      console.log(data);
      setUser(data?.data?.user);
      setChannel(data.data?.channel?.name);
    };
    getUser();
  }, []);
  const handleDownloadPDF = () => {
    html2canvas(document.querySelector("body")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("download.pdf");
    });
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ background: "linear-gradient(to right, #2E2E30, #1E1E1E)" }}
    >
      <div className="max-w-5xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center bg-gray-900 px-6 py-4">
          <div className="text-3xl font-bold text-white">
            Certificate of Achievement
          </div>
          <div className="text-sm text-white">
            Date: {new Date().toLocaleDateString()}
          </div>
        </div>
        <div className="px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-300">
              This is to certify that
            </div>
            <div className="w-16 h-16 bg-gray-300 rounded-full flex justify-center items-center">
              <img
                src={user?.user?.avatar?.url}
                alt="User"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-semibold text-blue-300">
              {user?.user?.name}
            </p>
            <p className="text-lg font-semibold text-gray-300">on being</p>
            <p className="text-3xl font-semibold text-blue-300">{user?.role}</p>
            <p className="text-lg font-semibold text-gray-300">at</p>
            <p className="text-3xl font-semibold text-blue-300">{channel}</p>
            <p className="text-lg font-semibold text-gray-300">
              Feedback: {user?.feedback}
            </p>
          </div>
        </div>
        <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-gray-300">Issued by:</p>
            <p className="text-base font-semibold text-gray-200">Sync Track</p>
            <p className="text-sm text-gray-400">
              Comsats University Islamabad
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
