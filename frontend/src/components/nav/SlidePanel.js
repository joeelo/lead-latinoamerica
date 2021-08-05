import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LanguageButtons from './LanguageButtons';
import LinkUnderlineEffect from '../generic/LinkUnderlineEffect';

const SlidePanel = ({ navOpen }) => {

	const wrapperRef = useRef(null);

	const handleClickOutside = (event) => {
		if (navOpen === true) {
		console.log(event);
		}
	}

	useEffect(() => {
		if (navOpen === true) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'visible';
		}
	}, [ navOpen ]);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => document.removeEventListener('click', handleClickOutside);
	}, [])

	return (
		<Container navOpen={ navOpen } ref={ wrapperRef }>
			<LanguageButtons />
			<SectionHeader> Student Resources </SectionHeader>
			<LinkUnderlineEffect hrefFormatted="/Sign-in" text={ 'Sign In' } color={ 'cyan' }/>
			<LinkUnderlineEffect hrefFormatted="/resources/programs" text={ 'Programs' } color={ 'cyan' }/>
			<LinkUnderlineEffect hrefFormatted="/resources/scholarships" text={ 'Scholarships' } color={ 'cyan' }/>
			<LinkUnderlineEffect hrefFormatted="/resources/internships" text={ 'Internships' } color={ 'cyan' }/>
			<SectionHeader>Org Portal</SectionHeader>
			<LinkUnderlineEffect hrefFormatted="/add-edit-orgs" text={ 'Add your Org' } color={ 'cyan' }/>
			<LinkUnderlineEffect hrefFormatted="/support" text={ 'Partner with Us' } color={ 'cyan' }/>
			<LinkUnderlineEffect hrefFormatted="/donate" text={ 'Donate' } color={ 'cyan' }/>
			<BottomSection>
				<LinkUnderlineEffect hrefFormatted="/frequently-asked-questions" text={ 'FAQ' } color={ 'cyan' }/>
				<LinkUnderlineEffect hrefFormatted='/mission-statement' text={'Our Mission'}  color={ 'cyan' }/>
			</BottomSection>

		</Container>
	)
}

export default SlidePanel;

const Container = styled.nav`
	z-index: 10000; 
	background-color: white; 
	width: 400px; 
	height: 100vh;
	position: absolute; 
	top: 70px;
	left: ${ props => props.navOpen === false ? '-400px' : '0'}; 
	padding: 10px;
	transition: .4s ease-in-out;
	padding: 50px 20px;
	box-shadow: ${ props => props.navOpen ? '3px 15px 25px -4px rgba(156,156,156,1)' : 'none' } ; 
`

const BottomSection = styled.div`
	margin-top: 40px; 
`

const SectionHeader = styled.p`
	font-size: 34px;
	margin-bottom: 10px; 
	font-weight: 300;
	margin-top: 20px;
`