import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const PriceChart = ({ data, labels, color = '#00f0ff' }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#131314',
        titleColor: '#e5e2e3',
        bodyColor: '#e5e2e3',
        borderColor: '#3b494b',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `$${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        data: data,
        borderColor: color,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, `${color}33`);
          gradient.addColorStop(1, `${color}00`);
          return gradient;
        },
        borderWidth: 2,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default PriceChart;
