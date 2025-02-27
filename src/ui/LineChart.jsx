import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, options, onChartClick }) => {
  const chartRef = useRef(null);

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const handleClick = (event) => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const element = chart.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      false
    );

    if (element.length > 0) {
      const { datasetIndex, index } = element[0];
      onChartClick?.({
        label: data.labels[index],
        dataset: data.datasets[datasetIndex].label,
        value: data.datasets[datasetIndex].data[index],
      });
    }
  };

  return (
    <Line
      ref={chartRef}
      data={data}
      options={{
        ...defaultOptions,
        ...options,
        onClick: handleClick,
      }}
    />
  );
};

export default LineChart;
