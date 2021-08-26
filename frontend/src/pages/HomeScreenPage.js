import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import NavBar from '@/components/nav/NavBar';
import FullScreenBack from '@/components/background/FullScreenBack';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import TitleWithBackground from '@/components/generic/TitleWithBackground';
import FlexContentBox from '@/components/content/FlexContentBox';
import Footer from '@/components/footer/Footer';
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';
import ContentWithSideImage from '@/components/content/ContentWithSideImage';


const HomeScreenPage = () => {

	const theme = useContext(ThemeContext);

	const opportunityInfo = [
		{ 
			title: 'Scholarships', 
			text:'Find scholarships to help fund your educational journey.', 
			footer: 'See our Scholarship Opportunities',
			svg: '/images/svg/scholarship-svgrepo-com.svg'
		}, 
		{
			title: 'Summer', 
			text:'Find a summer opportunity that allows you to connect with peers while building on your educational and professional experience.', 
			footer: 'See our Summer Opportunities',
			svg: '/images/svg/summer-svgrepo-com.svg'
		}, 
		{
			title: 'Internships',
			text:'Browse through internship opportunities that will allow you to build on your professional experience.', 
			footer: 'See our Internship Opportunities',
			svg: '/images/svg/learning-svgrepo-com.svg'
		}, 
		{
			title: 'Programs',
			text:'Select from a broad range of programs in your community that will help you thrive.', 
			footer: 'See our Program Opportunities',
			svg: '/images/svg/online-class-svgrepo-com.svg'
		}, 
	]

	const recentlyPosted = [
		{ 
			title: 'Opportunity 1 ', 
			text:'Check out this opportunity ', 
			footer: 'See our Scholarship Opportunities'
		}, 
		{
			title: 'Opportunity 2', 
			text:'This is another one. This information is not necessary right now.', 
			footer: 'See our Summer Opportunities'
		}, 
		{
			title: 'Opportunity 3 ',
			text:'This is the last one, ', 
			footer: 'See our Internship Opportunities'
		},  
	]

	return (
		<>
			<NavBar />
			<FullScreenBack src='/images/javier-trueba-iQPr1XkF5F0-unsplash.jpg'>
				<PortalTitleContainer>
				<PortalTitle>Web Portal</PortalTitle>
				<PortalSubTitle>Powered by LEAD.Latinoamérica</PortalSubTitle>
				</PortalTitleContainer>

				<MainTitleContainer>
				<MainTitleFirstLine>Connecting students to</MainTitleFirstLine>
				<MainTitleSecondLine>opportunities in the community</MainTitleSecondLine>
				</MainTitleContainer>
			</FullScreenBack>


			<CenterFlexContainer backgroundColor={ theme.colors.darkBlue } padding={'padTop'}>
				<ChangingBackgroundText 
					secondaryColor={ 'white' }
					text={ 'Thousands of Students' }
				/>

				<ContentWithSideImage 
					backgroundColor={ theme.colors.darkBlue }
					imageSrc={'/images/tony-luginsland-yXnnR9smke0-unsplash.jpg'}
					text={
						[
						'Countless students experience lack of funding,  and  opportunities simply because they didn\'t know that they were available to them. ', 
						'We\'re trying to change this by bringing all the resources together in one place. No more looking on several sites or pages for that scholarship you\'ve heard about or that internship you want.', 
						'What you see is the most updated list we have available in your area. If you know something exists and you don\'t see it here, please let us know and we\'ll add it so everyone can prosper with the same knowledge.'
						]
					}
				/>
			</CenterFlexContainer>

			<CenterFlexContainer backgroundColor={ theme.colors.cultured } padding={ 'padTop' }>
				{
					opportunityInfo.map(info => <FlexContentBox 
						key={ info.title } 
						size={ 'halves' } 
						content={ info } 
						color={ theme.colors.darkText }
						backgroundColor={ theme.white }
					/>)
				}
			</CenterFlexContainer>
			<Footer showQuote={ false }/>
		</>
	)
}

export default HomeScreenPage;

const PortalTitleContainer = styled.div`
	position: relative; 
	left: 20px; 
	top: 20px;
	max-width: 90vw;
`

const PortalTitle = styled.h2`
	font-size: 68px;

	@media screen and (max-width: 768px) {
	font-size: 34px;
	}
`

const PortalSubTitle = styled.h3`
	font-size: 26px; 
	position: relative; 
	top: -15px;
	left: 5px;

	@media screen and (max-width: 768px) {
		font-size: 22px; 
		top: 0px;
		left: 0;
		line-height: 20px; 
	}
`

const MainTitleContainer = styled.div`
	position: relative; 
	top: 100px;
	left: 20px;
	max-width: 90vw;
`

const MainTitle = styled.h1`
	color: white; 
	font-size: 48px;
	position: relative; 

	@media screen and (max-width: 768px) {
		font-size: 34px; 
	}
`

const MainTitleFirstLine = styled(MainTitle)`	
	left: 0; 
	margin-bottom: 10px; 
`

const MainTitleSecondLine = styled(MainTitle)`
	top: -20px;

	@media screen and (max-width: 768px) {
		top: 0;
	}
`
