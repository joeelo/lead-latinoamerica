import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { React, useEffect, useState } from 'react'

import Hamburger from '@/components/nav/Hamburger'

import SlidePanel from './SlidePanel'

export default function MobileNav() {
  const [navOpen, setNavOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (navOpen) {
      setNavOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return (
    <>
      <Box
        // To take up the fixed height at the top of page and force content down
        height="70px"
        width="100vw"
        bgcolor="white"
        zIndex={1000}
      />
      <Box
        width="100vw"
        bgcolor="white"
        position="fixed"
        minHeight="70px"
        top={0}
        zIndex={1000}
        boxShadow={navOpen ? 0 : '3px 0px 35px -4px rgba(156, 156, 156, 1)'}
      >
        <Hamburger {...{ navOpen, setNavOpen }} />
        <SlidePanel {...{ navOpen, setNavOpen }} />
      </Box>
    </>
  )
}
