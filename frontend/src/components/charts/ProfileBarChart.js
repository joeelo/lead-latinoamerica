import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const data = [
  {
    name: 'Jan',
    opportunities: 4000,
  },
  {
    name: 'Feb',
    opportunities: 3000,
  },
  {
    name: 'Mar',
    opportunities: 2000,
  },
  {
    name: 'Apr',
    opportunities: 2780,
  },
]

const ProfileBarChart = () => {

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
          <Bar dataKey="opportunities" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default ProfileBarChart