import React, { useState, useEffect } from "react";
import ProgressChart from "./ProgressChart";

const Progress = () => {
  // Example data, replace with actual data fetching logic
  const [progressData, setProgressData] = useState([
    { name: "Timeline", completed: 80, total: 100 },
    { name: "Milestones", completed: 10, total: 20 },
    { name: "Tasks", completed: 30, total: 50 },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Project Progress</h2>
      <ProgressChart data={progressData} />
    </div>
  );
};

export default Progress;
