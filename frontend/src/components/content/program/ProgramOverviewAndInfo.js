import styled from 'styled-components';
import Button from "@/components/buttons/Button";
import { UpdateUsersSavedPrograms } from "@/fetch/user/UserRequests";
import Box from "@/components/generic/Box";
import { ToastContainer, toast } from 'react-toastify';
import Tiles from './Tiles';
import ExternalLink from '@/components/generic/ExternalLink';

const ProgramOverviewAndInfo = ({ program, email, preview }) => {

	const successNotification = () => toast('Successfully saved to profile!', {
    position: 'bottom-right',
    hideProgressBar: true,
    style: { background: '#43a23c', color: 'white' },
  });

	const failureNotification = () => toast('Something went wrong, check the logs!', {
		position: 'top-right',
    hideProgressBar: true,
		style: { background: '#cc0000', color: 'white', zIndex: 10000 },
	})

	const handleClick = async () => {
		const response = await UpdateUsersSavedPrograms(email, program._id);
		if (response.success) {
			successNotification(); 
		} else {
			failureNotification();
		}
	}

	return (
		<>
			<Container>
				<Box width="55%">
					<LargeText> Overview </LargeText>
					<StyledP> { program.bio } </StyledP>
					{!preview ? (
						<>
							<ExternalLink 
								href={program.partnerUrl} 
								bgColor="#0077B6"	
							>
								Sign up
							</ExternalLink>

							<Button label='Save to profile' color='#1F2041' onClick={handleClick}/>
						</>
						) 
						: <Button label='Sign up'></Button>
					}
				</Box>

				<Box width="40%">
					<UnderlinedSectionHeader> Categories </UnderlinedSectionHeader>
					<Tiles adjectives={ program.helpsWith }/>
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

