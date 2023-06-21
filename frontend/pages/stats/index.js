import Box from '@mui/system/Box'
import ProgramChartWrapper from 'src/components/charts/ProgramChartWrapper'

export default function StatsPage() {
  return (
    <Box style={{ maxWidth: 1200, width: '90%', margin: '0 auto', paddingTop: 40}}>
      <ProgramChartWrapper />
    </Box>
  )
}