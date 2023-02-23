import BarChart from './BarChart'
import { useQuery } from 'react-query'

function ProgramChartWrapper() {
  const programsAdded = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/stats/programs`
    )
    const json = await response.json()
    return json
  }

  const programsAddedQuery = useQuery({
    key: 'report-programs',
    queryFn: programsAdded,
  })

  console.log('programsAddedQuery: ', programsAddedQuery)

  if (programsAddedQuery.isLoading || programsAddedQuery.error) {
    return null
  }

  const { data = {} } = programsAddedQuery
  const { stats } = data.message || {}

  const categories = Object.keys(stats)
  const seriesData = Object.values(stats)

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
        categories,
      },
    },
    series: [
      {
        name: 'Programs added',
        data: seriesData,
      },
    ],
  }

  return <BarChart options={options} />
}

export default ProgramChartWrapper
