import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PhotoWithTextBox = ({  
	program: {
		organization = '', 
		coverImage, 
		bio, 
		href,
	} 
}) => {
	const router = useRouter();
	const formattedLink = organization.replaceAll(' ', '-');
	const clickHandler = () => {
		router.push(`${router.asPath}/${formattedLink.toLowerCase()}`);
	}

	const truncatedString = bio.length < 100 ? bio : `${bio.slice(0, 150)}...`;

	return (
		<Container onClick={ clickHandler }>
			<PhotoWithTextOverlay>
				<StyledImage src={ `${coverImage}` }/>
				<RightAlignedText> { organization } </RightAlignedText>
			</PhotoWithTextOverlay> 

			<Bio> - { truncatedString } </Bio>
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
	min-width: 350px; 
	min-height: 550px;
	max-width: 400px;
	width: 30%;
	box-shadow: 1px 2px 15px 0px rgba(184,177,184,1);
	border-radius: 4px;
	padding-bottom: 15px;
	margin-bottom: 40px;
	transition: .2s ease-in-out all;
	max-height: 550px;

	:hover {
		transform: translate(-3px, -3px); 
		cursor: pointer;
	}
`

const PhotoWithTextOverlay = styled.div`
	position: relative; 
	width: 100%; 
	height: 300px;
	text-align: right; 
	margin-bottom: 20px;
	min-height: 300px;
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

const StyledImage = styled.img`
	object-fit: cover; 
	border-radius: 4px;
	max-width: 100%; 
	min-height: 100%;
	width: 100%;
	position: absolute;
	left: 0; 
	top: 0; 
`
