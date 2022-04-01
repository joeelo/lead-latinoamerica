import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Hamburger from '@/components/nav/Hamburger';
import SlidePanel from './SlidePanel';
import { ThemeContext } from 'styled-components';

const NavBar = () => {
	const [ navOpen, setNavOpen ] = useState(false);
	const theme = useContext(ThemeContext)
  const router = useRouter();

	const homeClickHandler = () => {
		router.push(`/`);
	}

	const addProgramHandler = () => {
		router.push(`/add-program`);
	}

	const { darkBlue, primary } = theme.colors

	useEffect(() => {
		if (navOpen) {
			setNavOpen(false);
		}
	}, [ router.asPath ])

	return (
		<>
			<PlaceHolderContainer></PlaceHolderContainer>
			<Container>
				<Hamburger { ...{ navOpen, setNavOpen } }/>
				<AddProgramButton 
					backgroundColor={darkBlue} 
					hoveredBackgroundColor={primary}
					onClick={addProgramHandler}
				>
					ADD PROGRAM
				</AddProgramButton>
				<HomeButton 
					backgroundColor={darkBlue} 
					hoveredBackgroundColor={primary}
					onClick={homeClickHandler}
				>
					HOME
				</HomeButton>
				<SlidePanel { ...{ navOpen, setNavOpen } }/>
			</Container>
		</>
	)
}

export default NavBar;

const Container = styled.div`
	width: 100vw;
	background-color: white; 
	position: fixed;
	min-height: 70px;
	top: 0;
	z-index: 1000;
	box-shadow: 3px 0px 35px -4px rgba(156,156,156,1); 
`

const PlaceHolderContainer = styled.div` // To take up the fixed height at the top of page and force content down
	height: 70px; 
	width: 100vw; 
	background-color: white; 
	z-index: 1000;
`

const HomeButton = styled.div`
	position: fixed; 
	right: 20px; 
	height: 50px; 
	top: 10px;
	background-color: ${(props) => props.backgroundColor};
	color: white; 
	display: flex; 
	align-items: center; 
	justify-content: center; 
	cursor: pointer; 
	width: 120px; 
	border-radius: 4px; 
	transition: .2s ease-in-out all;
	font-weight: bold;
	font-size: 14px;

	:hover {
		background-color: #3a3970;
	}

	@media screen and (max-width: 768px) {
    width: 100px; 
		height: 40px; 
		top: 15px; 
		font-weight: normal;
		font-size: 14px;
		display: none;
  }
`

const AddProgramButton = styled(HomeButton)`
	right: 160px; 
`