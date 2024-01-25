import Box from '@mui/material/Box'
import Footer from "src/components/footer/Footer"
import NavBar from "src/components/nav/NavBar"

export default function Layout({
  children
}) {
  return (
    <Box minHeight="100vh" position="relative" display="flex" flexDirection="column">
      <NavBar />
        {children}
      <Footer />
    </Box>
  )
}

