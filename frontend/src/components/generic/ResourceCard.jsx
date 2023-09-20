import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import Button from "src/components/buttons/Button"

export default function ResourceCard({
  src, 
  name, 
  description, 
  href, 
}) {
  return (
    <Box display="flex" flexWrap="wrap">
      <Image 
        alt={`image-src-${src}`}
        src={src}
        height={200}
        width={300}
        style={{ 
          maxWidth: '90%',
          borderRadius: 4, 
        }}
      />

      <Box display="flex" flexDirection="column">
        <Typography>
          {name}
        </Typography>
        <Typography>
          {description}
        </Typography>
        <Typography>
          {href}
        </Typography>
        <Button label="Learn more"/>
      </Box>
    </Box>
  )
}