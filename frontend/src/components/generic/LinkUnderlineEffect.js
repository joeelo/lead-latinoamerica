import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function LinkUnderlineEffect({
  text,
  hrefFormatted,
  color = 'rgb(0, 119, 182)',
  openInNewTab,
}) {

  return (
    <Box margin={0} padding={0} height={35}>
      <Typography
        component="a"
        href={`${hrefFormatted}`} 
        target={openInNewTab ? "_blank" : ''} 
        rel={openInNewTab ? "noopener noreferrer" : ''}
        sx={{
          transition: 'background-size 0.3s, background-position 0s 0.3s', /*change after the size immediately*/
          backgroundImage: 'linear-gradient(#000, #000)', 
          backgroundPosition: '0 100%', /*OR bottom left*/
          backgroundSize: '0% 2px',   
          textDecoration: 'none',
          backgroundRepeat: 'no-repeat',

          '&:hover': {
            backgroundPosition: '100% 100%', /*OR bottom right*/
            backgroundSize: '100% 2px', 
            color: color,
          }, 
          '&:visited': {
            color,
            textDecoration: 'none',

          }
        }}
        mb={.5}
        display="inline-block"
        pb={.25}
        color={color}
      >
        {text}
      </Typography>
    </Box>
  )
}