import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./BarChart.scss";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import axios from "axios";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
// Define the expected structure of dayData
interface DayData {
  day: string;
  totalPayments: number;
}

// Define the expected structure of the API response
interface WeeklySummaryResponse {
  weekLabel: string;
  days: DayData[];
}

// Set the chart data type for line charts
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}

const WeeklyLineChart: React.FC = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weekly summary data from API
    const fetchData = async () => {
      try {
        const response = await axios.get<WeeklySummaryResponse[]>(
          `${serviceURL}/api/getSummary/weekly`,
        );
        const data = response.data;

        const days = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        const totalPayments = new Array(7).fill(0);

        // Map the data into correct day positions
        data[0].days.forEach((dayData: DayData) => {
          const dayIndex = days.indexOf(dayData.day);
          if (dayIndex !== -1) {
            totalPayments[dayIndex] = dayData.totalPayments;
          }
        });

        setChartData({
          labels: days,
          datasets: [
            {
              label: `Weekly Payments (${data[0].weekLabel})`,
              data: totalPayments,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching weekly summary data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid-layout-bar">
      <h1>{t("graphLanguage.headerLine")}</h1>
      <div>
        <Line className="chart-container-week" data={chartData} />
      </div>
    </div>
  );
};

export default WeeklyLineChart;
