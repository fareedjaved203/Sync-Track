import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const CertificatePage = ({
  userName = "Fareed Javed",
  achievement = "Team Lead",
}) => {
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
                src="https://via.placeholder.com/150"
                alt="User"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-semibold text-blue-300">{userName}</p>
            <p className="text-lg font-semibold text-gray-300">has achieved</p>
            <p className="text-3xl font-semibold text-blue-300">
              {achievement}
            </p>
            <p className="text-lg font-semibold text-gray-300">awarded on</p>
            <p className="text-lg font-semibold text-gray-300">
              Date of Achievement
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
            <p className="text-sm text-gray-400">
              Contact: +1234567890, Email: info@example.com
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
