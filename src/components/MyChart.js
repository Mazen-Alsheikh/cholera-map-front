import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "../../src/index.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ cases, recovered, deaths }) {
  const data = {
    labels: ['إصابات', 'تعافي', 'وفيات'],
    datasets: [
      {
        label: "عدد الحالات",
        data: [cases, recovered, deaths],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} حالة`;
          },
        },
      },
      title: {
        display: true,
        text: "إحصائيات الحالات",
      },
    },
  };

  return <Pie className="pie-chart p-0 mx-auto" data={data} options={options} />;
}
