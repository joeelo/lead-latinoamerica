import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

function BarChart({ opts, width = '100%', height = '100%' }) {
  const options = {
    options: {
      chart: {
        id: 'apexchart-example',
        toolbar: {
          show: false,
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  }

  return <Chart width={width} height={height} {...options} type="bar" />
}

export default BarChart
