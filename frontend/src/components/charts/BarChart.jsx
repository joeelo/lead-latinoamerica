import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
function BarChart({ options = {}, width = '100%', height = '100%' }) {
  return <Chart width={width} height={height} {...options} type="bar" />
}

export default BarChart
