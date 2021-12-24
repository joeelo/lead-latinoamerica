import CenterFlexContainer from "@/components/generic/CenterFlexContainer";
import styled from 'styled-components';
import CategoryTiles from '@/components/content/program/CategoryTiles';
import LinkButton from "@/components/generic/LinkButton";
import useGetRouterPath from "@/hooks/useGetRouterPath";
import Button from "@/components/buttons/Button";
import { UpdateUsersSavedPrograms } from "@/fetch/user/UserRequests";
import Box from "@/components/generic/Box";

const ProgramOverviewAndInfo = ({ program, email }) => {
	const path = useGetRouterPath();

	const handleClick = async () => {
		const response = await UpdateUsersSavedPrograms(email, program._id);
	}

	return (
		<>
			<Container>
				<Box width="60%">
					<LargeText> Overview </LargeText>
					<StyledP> { program.bio } </StyledP>
					<LinkButton 
						text={ 'Sign Up' } 
						hrefFormatted={'/resources/[resourceSlug]/[programSlug]/sign-up'} 
						hrefAs={`${path}/sign-up`} 
					/>
					<Button label='Save to profile' color='#1F2041' onClick={handleClick}/>
				</Box>

				<Box width="35%">
					<UnderlinedSectionHeader> Categories </UnderlinedSectionHeader>
					<CategoryTiles adjectives={ program.helpsWith }/>
				</Box>
			</Container>
		</>
	)
}

export default ProgramOverviewAndInfo;

const Container = styled.div`
	display: flex; 
	width: 95%; 
	max-width: 1200px; 
	padding: 40px 20px; 
	margin: 0 auto; 
	justify-content: space-between;

	@media screen and (max-width: 768px) {
		flex-direction: column-reverse; 
	}
`

const LargeText = styled.h2`
	font-weight: bold;
	font-size: 72px; 

	@media screen and (max-width: 768px) {
		font-size: 48px; 
		margin-top: 0; 
	}
`

const MidSizeText = styled.p`
	font-size: 26px; 
	line-height: 32px
`

const StyledP = styled(MidSizeText)`
	font-size: 26px;
`

const UnderlinedSectionHeader = styled.h3`
	font-size: 32px; 
	text-decoration: underline; 
	margin-top: 15px;

	@media screen and (max-width: 768px) {
		margin-top: 0; 
	}
`

