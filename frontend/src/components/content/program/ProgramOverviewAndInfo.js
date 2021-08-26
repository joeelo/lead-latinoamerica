import CenterFlexContainer from "@/components/generic/CenterFlexContainer";
import styled from 'styled-components';
import CategoryTiles from '@/components/content/program/CategoryTiles';
import BlueLinkButton from "@/components/generic/BlueLinkButton";
import useGetRouterPath from "@/hooks/useGetRouterPath";

const ProgramOverviewAndInfo = ({ program }) => {
	const path = useGetRouterPath();

	return (
		<>
			<CenterFlexContainer paddingTop={ true } paddingBottom={ true } align={ 'start' }>
				<LeftContainer>
					<LargeText> Overview </LargeText>
					<BioText> { program.bio } </BioText>
					<BlueLinkButton text={ 'Sign Up' } hrefFormatted={'/resources/[resourceSlug]/[programSlug]/sign-up'} hrefAs={`${path}/sign-up`} />
				</LeftContainer>
				<RightContainer>
					<UnderlinedSectionHeader> Categories </UnderlinedSectionHeader>
					<CategoryTiles adjectives={ program.helpsWith }/>
				</RightContainer>
			</CenterFlexContainer>
		</>
	)
}

export default ProgramOverviewAndInfo;

const LargeText = styled.h2`
	font-weight: bold;
	font-size: 72px; 
	margin-bottom: 40px; 
`

const InnerContainer = styled.div`
	padding: 10px 20px; 
	display: flex; 
	flex-direction: column; 
	justify-content: flex-start;
`

const LeftContainer = styled(InnerContainer)`
	width: 60%; 
`

const RightContainer = styled(InnerContainer)`
	width: 40%; 
`

const MidSizeText = styled.p`
	font-size: 26px; 
	line-height: 32px
`

const BioText = styled(MidSizeText)`
	font-size: 26px;
`

const StartDateText = styled(MidSizeText)`
	font-size: 26px;
`

const UnderlinedSectionHeader = styled.h3`
	font-size: 32px; 
	text-decoration: underline; 
	margin-top: 15px;
`

