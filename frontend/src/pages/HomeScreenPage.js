import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styled, { ThemeContext } from 'styled-components';
import NavBar from '@/components/nav/NavBar';
import FullScreenBack from '@/components/background/FullScreenBack';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import FlexContentBox from '@/components/content/FlexContentBox';
import Footer from '@/components/footer/Footer';
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';
import ContentWithSideImage from '@/components/content/ContentWithSideImage';
import VideoBackground from '@/components/background/VideoBackground';
import FadeInText from '@/components/generic/FadeInText';
import useGetRandomQuote from '@/hooks/useGetRandomQuote';
import en from '@/language/locales/en/common.json';
import es from '@/language/locales/es/common.json';
import useLocale from '@/hooks/useLocale';


const HomeScreenPage = () => {

	const theme = useContext(ThemeContext);
	const quote = useGetRandomQuote(); 
	const router = useRouter(); 
	const { locale } = router; 
	const t = useLocale() === 'en' ? en : es;


	const opportunityInfo = [
		{ 
			title: t.scholarships.headline, 
			text:t.scholarships.bio, 
			footer: t.scholarships.link,
			svg: '/images/svg/scholarship-svgrepo-com.svg'
		}, 
		{
			title: t.summer.headline, 
			text:t.summer.bio, 
			footer: t.summer.link,
			svg: '/images/svg/summer-svgrepo-com.svg'
		}, 
		{
			title: t.internships.headline,
			text:t.internships.bio, 
			footer: t.internships.link,
			svg: '/images/svg/learning-svgrepo-com.svg'
		}, 
		{
			title: t.programs.headline,
			text:t.programs.bio, 
			footer: t.programs.link,
			svg: '/images/svg/online-class-svgrepo-com.svg'
		}, 
	]
	
	return (
		<>
			<NavBar />
			<FullScreenBack src='/images/javier-trueba-iQPr1XkF5F0-unsplash.jpg'>
				<PortalTitleContainer>
				<PortalTitle>{t.headline1}</PortalTitle>
				<PortalSubTitle>{t.headline2}</PortalSubTitle>
				</PortalTitleContainer>

				<MainTitleContainer>
				<MainTitleFirstLine>{t.headline3}</MainTitleFirstLine>
				<MainTitleSecondLine>{t.headline4}</MainTitleSecondLine>
				</MainTitleContainer>
			</FullScreenBack>

			<CenterFlexContainer backgroundColor={ theme.colors.cultured } minHeight={ 'auto' } padding={ 60 }>
				<ChangingBackgroundText 
					initialColor={ theme.colors.cultured }
					secondaryColor={ theme.colors.darkBlue }
					text={ t.missionDistrict }
					fontColorInitial={ theme.colors.darkBlue }
					fontColorSecondary={ theme.colors.cultured }
				/>
			</CenterFlexContainer>
			<CenterFlexContainer backgroundColor={ theme.colors.cultured }>
				{
					opportunityInfo.map(info => <FlexContentBox 
						key={ info.title } 
						size={ 'halves' } 
						content={ info } 
						color={ theme.colors.darkText }
						backgroundColor={ theme.white }
						minHeight={ 400 }
					/>)
				}
			</CenterFlexContainer>


			<CenterFlexContainer backgroundColor={ theme.colors.darkBlue } padding={'padTop'}>
				<ChangingBackgroundText 
					secondaryColor={ 'white' }
					text={ t.purpose }
				/>
				<ContentWithSideImage 
					backgroundColor={ theme.colors.darkBlue }
					imageSrc={'/images/tony-luginsland-yXnnR9smke0-unsplash.jpg'}
					text={
						[
							t.purposeArray.sentence1, 
							t.purposeArray.sentence2, 
							t.purposeArray.sentence3, 
						]
					}
				/>
			</CenterFlexContainer>

			<VideoBackground src='/pexels-rodnae-productions-8419363.mp4'>
				<CenterFlexContainer justify='start' align='start' paddingTop>
					<FadeInText 
						onlyRunOneTransition={ true } 
						textArray={[quote?.text, `- ${quote?.author}`]} 
						maxWidth='800'
						fontSize={48}
					/>
				</CenterFlexContainer>
			</VideoBackground>
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
