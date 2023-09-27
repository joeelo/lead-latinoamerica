import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from "next/image"

import ExternalLink from "./ExternalLink"

export default function ResourceCard({
  src, 
  name, 
  description, 
  href, 
}) {
  const isMobile = useMediaQuery('(max-width:800px)')

  return (
    <Box display="flex" flexWrap="wrap">
      <Box 
        height={275} 
        width={350} 
        mr={isMobile ? 0 : 5} 
        margin={isMobile ? '0 auto 16px auto' : ''}
        borderRadius={4} 
        overflow="hidden" 
        boxShadow="12px 12px 20px 4px rgba(0,0,0,0.2)"
      >
        <Image 
          alt={`image-src-${src}`}
          src={src}
          height={275}
          width={400}
          style={{ 
            maxWidth: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>

      <Box display="flex" flexDirection="column" maxWidth={550}>
        <Typography variant="h4" fontWeight="bold">
          {name}
        </Typography>
        <Typography mt={2}>
          {description}
        </Typography>
        <Typography mt={2}>
          {href}
        </Typography>
        <Box mt="auto">
          <ExternalLink label="Learn more" href={href}/>
        </Box>
      </Box>
    </Box>
  )
}