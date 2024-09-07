import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(Tooltip, Legend, ArcElement);
const PieChart = () => {
  const PieChartData = {
    labels: ["Monday", "Tuesday", "Wednesday"],
    datasets: [
      {
        label: "Step",
        data: [8000, 7000, 9000],
        backgroundColor: [
          "rgba(125,125,125,1)",
          "rgba(113,81,230,1)",
          "rgba(45,182,125,1)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {};
  return <Doughnut data={PieChartData} options={options} />;
};

export default PieChart;
