import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import FullScreenBack from "@/components/background/FullScreenBack"
import Footer from "@/components/footer/Footer"
import ResourceCard from "@/components/generic/ResourceCard"
import NavBar from "@/components/nav/NavBar"
import useLocale from '@/hooks/useLocale'

import en from './locale/en'
import es from './locale/es'

export default function LocalResourcesPage() {
  const isEnglish = useLocale() === 'en'
  const t = isEnglish ? en : es

  return (
    <>
      <NavBar />

      <FullScreenBack 
				height="40vh"
        src="/images/hannah-busing-compressed.jpg"
        title={t.resources}
        titleInfo={{ 
					show: true, 
					backgroundColor: '#0077B6', 
					color: 'white' 
				}}
        noMarginBottom={false}
      />

      <Box display="flex" justifyContent="center">
        <Box maxWidth={1000} width="90%">
          <Typography fontSize={22}>
            {t.blurb}
          </Typography>

          <ResourceCard 
            src="/images/joshua-woroniecki-compressed.jpg"
            name="Family Paths"
            description="description here"
            href="https://familypaths.org/"
          />
        </Box>
      </Box>
      <Footer />
    </>
  )
}