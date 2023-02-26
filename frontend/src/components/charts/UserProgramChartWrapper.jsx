import BarChart from './BarChart'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/client'

function UserProgramChartWrapper() {
  const [session] = useSession()
  const email = session?.user?.email

  const programsAdded = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/stats/programs/${email}`
    )
    const json = await response.json()

    console.log('JSON: ', json)
    return json
  }

  const programsAddedQuery = useQuery({
    key: 'report-programs',
    queryFn: programsAdded,
  })

  if (programsAddedQuery.isLoading || programsAddedQuery.error) {
    return null
  }

  const { data = {} } = programsAddedQuery
  const { stats } = data.message || {}

  if (!stats) {
    return null
  }

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
    <>
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
    </>
  )
}

export default UserProgramChartWrapper
