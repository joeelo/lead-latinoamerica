import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function VideoBackground({ children, src }) {
  const isDestktopOrGreater = useMediaQuery('(max-width:1400px)')

  return (
    <Box
      minHeight={isDestktopOrGreater ? 650 : 800}
      minWidth='100vw'
      position='relative'
      overflow='hidden'
    >
      <video 
        playsInline 
        autoPlay 
        muted 
        loop 
        src={src} 
        style={{ 
          position: 'absolute', 
          height: '100%', 
          width: '177.77777vh', // /* 100 * 16 / 9 */
          minWidth: '100%', 
          minHeight: '56.25vw', // /* 100 * 9 / 16 */, 
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)' // /* % of current element */
        }}
      />
      {children}
    </Box>
  )
}