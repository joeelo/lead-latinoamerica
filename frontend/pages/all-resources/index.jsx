import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

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

  const isLoading = programsQuery.isLoading
  const programs = programsQuery.data?.message || []

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

      <Box 
        display='flex'
        justifyContent='center'
        mb={2} 
        sx={{
          mt: [-6, 0, 2, 2, 2],
          p: [4, 4, 2, 2, 2]
        }}
      >
        <Grid container maxWidth={1200}>
          {isLoading ? (
            <>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} justifyContent='center' display='flex'>
                <Skeleton animation="wave" variant="rectangular" height={350} width='80%'/>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} justifyContent='center' display='flex'>
                <Skeleton animation="wave" variant="rectangular" height={350} width='80%'/>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} justifyContent='center' display='flex'>
                <Skeleton animation="wave" variant="rectangular" height={350} width='80%'/>
              </Grid>
            </>
          ) : (
            <>
              {programs.map((program) => {
                return (
                  <Grid key={program._id} item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <PhotoWithTextBox 
                      program={program}
                    />
                  </Grid>
                )
              })}
            </>
          )}

          
        </Grid>
      </Box>
    </Layout>
  )
}