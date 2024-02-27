import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from "next/image"

import Footer from "@/components/footer/Footer"
import ResourceCard from "@/components/generic/ResourceCard"
import NavBar from "@/components/nav/NavBar"
import ResourceData from '@/data/resourceData'
import useLocale from '@/hooks/useLocale'

import en from './locale/en'
import es from './locale/es'

export default function LocalResourcesPage() {
  const isEnglish = useLocale() === 'en'
  const t = isEnglish ? en : es
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <>
      <NavBar />

      <Box style={{width: '100%', height: '40vh', position: 'relative', marginBottom: isMobile ? 32 : 16 }}>
        <Box position='absolute' top={20} left={20} color="white" fontSize={isMobile ? 24 : 56} zIndex={100} fontWeight={600}>
          Resources
        </Box>
        <Image
          src='/images/hannah-busing-compressed.jpg'
          width={0}
          objectFit='cover'
          layout='fill'
          alt="hands in a circle"
        />
      </Box>

      <Box display="flex" justifyContent="center">
        <Box 
          maxWidth={1000}
          width="90%" 
          mt={isMobile ? -2 : 4 }
          textAlign={isMobile ? 'center' : ''}
        > 
          <Typography fontSize={22}>
            {t.blurb}
          </Typography>

          <Box mt={6} maxWidth={1000}>
            {ResourceData.resources.map((data, index) => (
              <Box 
                key={data.href} 
                mb={6}
                borderBottom={index === ResourceData.resources.length - 1 ? '' : "1px solid rgba(0, 0, 0, .2)" }
                pb={5}
              >
                <ResourceCard 
                  src={data.src}
                  name={data.name}
                  description={isEnglish ? data.description : data.descriptionEs}
                  href={data.href}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}