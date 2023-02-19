import StatsRequests from '@/fetch/stats/StatsRequests'
import { useQuery } from 'react-query'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const ProfileBarChart = () => {

  const statsQuery = useQuery({
    key: 'program-stats', 
    queryFn: StatsRequests.getProgramStats
  })

  const { stats = {} } = statsQuery?.data?.message || {}

  // stats = { January: 1, February: 3 }
  const data = Object.entries(stats).map((stat) => {
    return {
      name: stat[0], 
      opportunityCount: stat[1]
    }
  })


  return (
    <ResponsiveContainer width={400} height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{fill: '#fff'}}/>
          <Bar dataKey="opportunityCount" fill="#1F2041" />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default ProfileBarChart