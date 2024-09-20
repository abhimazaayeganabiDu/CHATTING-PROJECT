import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins } from 'chart.js'
import { BorderColor, FastForward } from '@mui/icons-material';
import { orange, purple, purpleLight,orangeLight } from '../../constants/color';
import { getLast7Days } from '../../lib/features';
import { display } from '@mui/system';


ChartJs.register(Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const lebels = getLast7Days()

const LineChartOprtions = {
  responsive: true,
  plugins: {
    Legend: {
      display: false
    },
    title: {
      display: false,
    }
  },
  scales: {
    x: {
      // display: false
      grid: {
        display: false
      }
    },
    y: {
      // display: false
      beginAtZero: true,
      grid: {
        display: false
      }
    }
  }

}

function LineChart({ value = [] }) {
  const data = {
    labels: lebels,
    datasets: [
      {
        data: value,
        lebel: "Revenue",
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
      },
      //   {
      //   data:[1,23,3,43,2,66,23],
      //   lebel:"Revenue 2",
      //   fill:true,
      //   backgroundColor:"rgba(75,192,192,0.3)",
      //   borderColor:"rgba(75,12,192,1)"
      // },
    ],
  }
  return (
    <Line
      data={data}
      options={LineChartOprtions}
    />
  )
}

const doughnutChartOptions = {
  responsive:true,
  plugins: {
    legend:{
      display:false
    },
  },
  cutout:120,
}

function DoughnutChart({ value = [], labels = [],options = {doughnutChartOptions} }) {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: [purpleLight, orangeLight],
        hoverBackgroundColor:[purple,orange],
        borderColor: [purple, orange],
        offset: 40
      },
    ],
  }
  return (
    <Doughnut
      style={{zIndex:10}}
      data={data}
    />
  )
}

export { LineChart, DoughnutChart }