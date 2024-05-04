// imported required packages
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import userServices from "../../../Services/userService";

// register chart.js plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// function to find count of urls created on a particular day
const findURLCount = async (analytics) => {
  let urlCount = [];
  for (let i = 1; i <= 31; i++) {
    const count = analytics.filter(ele => new Date(ele.createdAt).getDate() === i).length;
    urlCount.push(count);
  }
  return urlCount;
}

const DayChart = () => {

  // state for analytics data;
  const [urlCount, setUrlCount] = useState([]);

  // get analytics data
  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const response = await userServices.getAnalytics();

        const urlCount = await findURLCount(response.data);
        setUrlCount(urlCount);

      } catch (error) {
        console.error("Error fetching analytics: ", error);
      }
    }
    getAnalytics();
  }, []);

  // chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Date wise URL created',
      },
    },
    maintainAspectRatio: false
  };

  // chart labels
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  // chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'URL Created',
        data: urlCount,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <Bar
      options={options}
      data={data}
    />
  )
}

export default DayChart;
