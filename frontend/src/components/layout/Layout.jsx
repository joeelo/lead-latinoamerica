'use-client'

import Box from '@mui/material/Box'
import { usePathname } from 'next/navigation'
import Footer from "src/components/footer/Footer"
import NavBar from "src/components/nav/NavBar"

export default function Layout({
  children
}) {
  const pathname = usePathname()

  // List of routes where the quote be excluded from footer
  const excludeRoutes = [
    '/'
  ]
  const excludeQuote = excludeRoutes.find((route) => route === pathname)

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <NavBar />
        <Box flexGrow={1}>
          {children}
        </Box>
        
        <Box flexShrink={0}>
          <Footer showQuote={!excludeQuote}/>
        </Box>
    </Box>
  )
}

