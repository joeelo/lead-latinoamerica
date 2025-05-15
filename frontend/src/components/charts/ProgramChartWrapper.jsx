import { useQuery } from 'react-query'

import StatsRequests from '@/fetch/stats/StatsRequests'

import BarChart from './BarChart'

function ProgramChartWrapper() {
  const programsAddedQuery = useQuery({
    key: 'report-programs',
    queryFn: StatsRequests.getAppProgramStats,
  })

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

  return (
    <div style={{ padding: '0 20px' }}>
      <h1 style={{ marginBottom: 30 }}>
        Number of opportunities added by month
      </h1>

      <div
        style={{
          borderRadius: 4,
          border: '1px solid rgba(0, 0, 0, .2)',
          padding: 20,
          width: '100%',
          height: 400,
          marginBottom: 20,
        }}
      >
        <BarChart options={options} />
      </div>
    </div>
  )
}

export default ProgramChartWrapper
