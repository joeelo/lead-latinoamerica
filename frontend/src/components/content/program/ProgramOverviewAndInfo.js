import styled from 'styled-components';
import Button from "@/components/buttons/Button";
import { UpdateUsersSavedPrograms } from "@/fetch/user/UserRequests";
import Box from "@/components/generic/Box";
import { ToastContainer, toast } from 'react-toastify';
import Tiles from './Tiles';
import ExternalLink from '@/components/generic/ExternalLink';
import getToast from '@/utils/getToast';

const ProgramOverviewAndInfo = ({ program, email, preview }) => {
	const handleClick = async () => {
		const response = await UpdateUsersSavedPrograms(email, program._id);
		if (response.success) {
			getToast({ message:'Successfully saved to profile!' })
		} else {
			getToast({ message: 'Something went wrong, check the logs!', variant: 'error' })
		}
	}

	new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

	const expDate = new Date(program.expirationDate)
		.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

	return (
		<>
			<Container>
				<Box width="55%">
					<LargeText> Overview </LargeText>
					<StyledP> { program.bio } </StyledP>
					{!preview ? (
						<>
							{program.partnerUrl && (
								<ExternalLink 
									href={program.partnerUrl} 
									bgColor="#0077B6"	
								>
									Sign up
								</ExternalLink>
							)}

							<Button label='Save to profile' color='#1F2041' onClick={handleClick}/>
						</>
						) 
						: <Button label='Sign up'></Button>
					}
				</Box>

				<Box width="40%">
					<UnderlinedSectionHeader> Categories </UnderlinedSectionHeader>
					<Tiles adjectives={ program.helpsWith }/>

					{program.expirationDate && (
						<>
							<UnderlinedSectionHeader> Deadline </UnderlinedSectionHeader>
							<StyledP>{expDate}</StyledP>
						</>
					)}

				</Box>
				
			</Container>
			<ToastContainer />
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
	font-size: 24px;
`

const UnderlinedSectionHeader = styled.h3`
	font-size: 32px; 
	text-decoration: underline; 
	margin-top: 15px;

	@media screen and (max-width: 768px) {
		margin-top: 0; 
	}
`

