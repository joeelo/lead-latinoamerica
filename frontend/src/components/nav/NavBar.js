import { useEffect, useState } from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import useIsMobile from '@/hooks/useIsMobile'

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
