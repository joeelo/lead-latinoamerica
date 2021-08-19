import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PhotoWithTextBox = ({  
	program, 
	program: {
		organization = '', 
		coverImage, 
		bio, 
		href,
	} 
}) => {

	console.log( 'program', program);
	const router = useRouter();
	const formattedLink = organization.replaceAll(' ', '-');

	return (
		<Container>
			<PhotoWithTextOverlay>
			<Image 
				src={ coverImage }
				layout='fill'
				objectFit='cover'
				objectPosition='center'
				style={{ zIndex: -1, position: 'absolute', borderRadius: 4 }}
			/>
			<RightAlignedText> { organization } </RightAlignedText>
			</PhotoWithTextOverlay> 

			<Bio> - { bio } </Bio>
			<Link href={`/resources/[resourceSlug]/[programSlug]`} as={`${router.asPath}/${formattedLink.toLowerCase()}`}>
			<StyledAnchor> explore { organization } </StyledAnchor>
			</Link>
		</Container>
	)
}

export default PhotoWithTextBox;

const Container = styled.div`
	display: flex;
	flex-direction: column; 
	min-width: 300px; 
	min-height: 550px;
	max-width: 400px;
	width: 30%;
	min-width: 300px;
	box-shadow: 1px 2px 15px 0px rgba(184,177,184,1);
	border-radius: 4px;
	padding-bottom: 15px;
	margin-bottom: 40px;
`

const PhotoWithTextOverlay = styled.div`
	position: relative; 
	width: 100%; 
	height: 300px;
	text-align: right; 
	margin-bottom: 20px;
`

const RightAlignedText = styled.p`
	width: 100px; 
	color: white; 
	font-size: 34px; 
	line-height: 34px; 
	z-index: 10; 
	color: white;
	position: relative;
	text-align: right;
	width: 100%;
	padding-right: 15px;
	padding-top: 15px;
	font-weight: 300;
`

const Bio = styled.p`
	font-size: 20px;
	line-height: 26px;
	padding: 20px; 
	padding-top: 5px;
`

const StyledAnchor = styled.a`
	margin-top: auto; 
	display: block;
	cursor: pointer;
	font-size: 20px;
	color: inherit; 
	text-decoration: none;
	margin-left: 20px;
`
