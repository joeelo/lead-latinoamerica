import BarChart from './BarChart'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/client'
import { DateTime } from 'luxon'
import { useState, useMemo } from 'react'
import { useEffect } from 'react'

function UserProgramChartWrapper() {
  const [session] = useSession()
  const email = session?.user?.email
  const [categories, setCategories] = useState([])

  const programsAdded = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/stats/programs/${email}`
    )
    const json = await response.json()

    return json
  }

  const programsAddedQuery = useQuery({
    key: 'report-programs',
    queryFn: programsAdded,
    enabled: !!email,
  })

  const { data = {}, isLoading, error } = programsAddedQuery

  const { stats } = useMemo(() => {
    return data.message || {}
  }, [data.message])

  useEffect(() => {
    const cats = Object.keys(stats || {})

    setCategories(cats)
  }, [stats])

  const seriesData = Object.values(stats || {})

  if (isLoading || error) {
    return null
  }

  const programData = seriesData.map((data) => data.program)
  const userData = seriesData.map((data) => data.user || 0)

  const monthsFormatted = categories.map((cat) => {
    const date = DateTime.fromISO(cat)
    return date.toLocaleString({ month: 'long', day: 'numeric' })
  })

  const options = {
    options: {
      chart: {
        id: 'apexchart-example',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: monthsFormatted,
      },
    },
    series: [
      {
        name: 'Programs added',
        data: programData,
      },
      {
        name: 'Programs saved',
        data: [null, null, 3, 6],
      },
    ],
  }

  return (
    <>
      <h1>Number of opportunities added by month</h1>
      <p style={{ marginBottom: 20 }}>
        How many opportunities have been added vs how many you've saved month
        over month
      </p>

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
