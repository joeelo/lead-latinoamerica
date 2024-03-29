import { useEffect, useState } from 'react'

import useIsMobile from '@/hooks/useIsMobile'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const NavBar = () => {
  const isMobile = useIsMobile()

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return !isMobile ? <DesktopNav /> : <MobileNav />
}

export default NavBar
