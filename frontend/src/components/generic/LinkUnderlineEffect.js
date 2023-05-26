import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Link from 'next/link';

const getFontSize = (size) => {
	switch (size) {
		case 'sm':
			return '16px'

		case 'md': 
			return '20px'

		case 'lg': 
			return '24px'

		default:
			return '22px'
	}
}

const LinkUnderlineEffect = ({ text, hrefFormatted, color = 'cyan', openInNewTab, size }) => {

	const theme = useContext(ThemeContext);

	return (
		<P {...{color, theme, size}}>
			{openInNewTab ? (
				<a href={`${hrefFormatted}`} target="_blank" rel="noopener noreferrer"> {text} </a>
			) : (
				<Link href={`${hrefFormatted}`}>
					{ text }
				</Link>
			)}
		</P>
	)
}

export default LinkUnderlineEffect;

const P = styled.p`
	margin: 0; 
	padding: 0; 
	font-size: inherit;
	height: 35px;
	font-size: ${ props => getFontSize(props.size)};

	a {
		text-decoration: none;
		margin-bottom: 3px;
		color: ${ props => props.color ? props.theme.colors[props.color] : '#222' };
		display: inline-block;
		padding-bottom: 2px;
		background-image: linear-gradient(#000, #000);
		background-position: 0 100%; /*OR bottom left*/
		background-size: 0% 2px;
		background-repeat: no-repeat;
		transition:
		background-size 0.3s,
		background-position 0s 0.3s; /*change after the size immediately*/

		@media screen and (max-width: 768px) {
			font-size: 18px;
		}
	}

	a:hover {
		background-position: 100% 100%; /*OR bottom right*/
		background-size: 100% 2px;
		color: ${ props => props.color ? props.theme.colors[props.color] : '#222' };
	}

	a:visited {
		color: black;
		color: ${ props => props.color ? props.color : '#222' };
	}
`