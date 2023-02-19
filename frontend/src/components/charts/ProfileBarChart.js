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

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className='custom-tooltip'>
        <div 
          style={{ 
            backgroundColor: 'white', 
            padding: 15, 
            maxWidth: 200,
            borderRadius: 4, 
            border: '1px solid rgba(0, 0, 0, .2)'
          }}
        >
          There were {payload[0].value} opportunities added in {label}
        </div>
      </div>
    )
  }

  return null
}

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
    <ResponsiveContainer width={"100%"} height={400}>
        <BarChart
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{fill: '#fff'}} content={<CustomTooltip />}/>
          <Bar dataKey="opportunityCount" fill="#1F2041" />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default ProfileBarChart