
import useIsMobile from '@/hooks/useIsMobile';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const NavBar = () => {
	const isMobile = useIsMobile()

	console.log('IS MOBILE: ', isMobile)

	return (
		!isMobile ? (
			<DesktopNav />
		) : (
			<MobileNav />
		)
	)
}

export default NavBar;