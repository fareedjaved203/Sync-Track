import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ProgressChart = ({ data }) => {
  return (
    <div className="w-full h-96">
      <BarChart width={800} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: "Days",
            position: "insideTopLeft",
            angle: -90,
            offset: -10,
          }}
          tickFormatter={(value) => `${value} days`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#8884d8" />
        <Bar dataKey="total" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default ProgressChart;
