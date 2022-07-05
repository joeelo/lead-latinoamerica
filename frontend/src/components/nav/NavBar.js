
import useIsMobile from '@/hooks/useIsMobile';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const NavBar = () => {
	const isMobile = useIsMobile()

	return (
		!isMobile ? (
			<DesktopNav />
		) : (
			<MobileNav />
		)
	)
}

export default NavBar;