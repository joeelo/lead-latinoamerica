import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'

import PhotoWithTextBox from '@/components/content/PhotoWithTextBox'
import ProgramRequests from '@/fetch/program/ProgramRequests'
import useHttpQuery from '@/hooks/useHttpQuery'

export default function AllResourcesPage() {
  const isMobile = useMediaQuery('(max-width:768px)')

  const programsQuery = useHttpQuery({
    key: 'all-programs', 
    apiFn: ProgramRequests.getAllPrograms, 
  })

  const isLoading = programsQuery.isLoading
  const programs = programsQuery.data?.message || []

  return (
    <Box>
      <Box style={{width: '100%', height: '40vh', position: 'relative', marginBottom: isMobile ? 32 : 16 }}>
        <Box position='absolute' top={20} left={20} color="white" fontSize={isMobile ? 24 : 56} zIndex={100} fontWeight={600}>
          Lead Programs
        </Box>
        <Image 
          src='/images/heylagostechie-IgUR1iX0mqM-unsplash.jpg'
          width={0}
          objectFit='cover'
          layout='fill'
          alt="high school students studying"
        />
      </Box>

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
    </Box>
  )
}