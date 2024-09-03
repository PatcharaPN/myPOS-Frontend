import { TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";
import "./BarChart.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getPaymentSummary } from "../../features/paymentSlice";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const paymentSummary = useAppSelector(
    (state: RootState) => state.payment.paymentSummary
  );
  useEffect(() => {
    dispatch(getPaymentSummary());
  }, []);
  const data = {
    labels: paymentSummary.map((month) => month.monthName),
    datasets: [
      {
        label: t("graphLanguage.barUnit"),
        data: paymentSummary.map((summary) => summary.totalPayments),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
        stacked: true,
      },
      y: {
        grid: {
          display: false,
        },
        stacked: true,
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 4,
        barThickness: 20,
      },
    },
  };

  return (
    <div className="bar-wrapper">
      <h1 className="bar-header">{t("graphLanguage.headerBar")}</h1>
      <div className="chart-container">
        <Bar className="bar-element" data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
