import Grid from '@mui/material/Grid'

import FullScreenBack from '@/components/background/FullScreenBack'
import PhotoWithTextBox from '@/components/content/PhotoWithTextBox'
import Layout from '@/components/layout/Layout'
import ProgramRequests from '@/fetch/program/ProgramRequests'
import useHttpQuery from '@/hooks/useHttpQuery'

export default function AllResourcesPage() {
  const programsQuery = useHttpQuery({
    key: 'all-programs', 
    apiFn: ProgramRequests.getAllPrograms, 
    apiFnArgs: []
  })

  const programs = programsQuery?.data?.message || []

  return (
    <Layout>
      <FullScreenBack 
        src='/images/heylagostechie-IgUR1iX0mqM-unsplash.jpg'
				height="40vh"
        title='Programs'
				titleInfo={{ 
					show: true, 
					backgroundColor: '#0077B6', 
					color: 'white' 
				}}
      />
      
      <Grid container>
        {programs.map((program) => {
          return (
            <Grid key={program._id} item xs={12} md={4} lg={4}>
              <PhotoWithTextBox 
                program={program}
              />
            </Grid>
          )
        })}
      </Grid>
    </Layout>
  )
}