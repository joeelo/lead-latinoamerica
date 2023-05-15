
import useIsMobile from '@/hooks/useIsMobile'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import { useEffect, useState } from 'react'

const NavBar = () => {
	const isMobile = useIsMobile()

	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) {
		return null
	}


	return (
		!isMobile ? (
			<DesktopNav />
		) : (
			<MobileNav />
		)
	)
}

export default NavBar;