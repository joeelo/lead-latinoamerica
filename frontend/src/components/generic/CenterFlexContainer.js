import styled from 'styled-components';

const CenterFlexContainer = ({
	children, 
	backgroundColor, 
	padding, 
	maxWidth, 
	minHeight, 
	paddingTop,
	paddingBottom,
	align, 
	justify, 
	...props
}) => {

	return (
		<FullScreenContainerForBackground
			{...{
				backgroundColor, 
				paddingTop, 
				paddingBottom, 
			}}
			{...props}
		>
			<Container 
				{...{
					padding, 
					maxWidth, 
					minHeight, 
					align, 
					justify
				}}
			>
				{ children }
			</Container>
		</FullScreenContainerForBackground>
	)
}

export default CenterFlexContainer; 

const FullScreenContainerForBackground = styled.div`
	display: flex; 
	min-width: 100vw; 
	background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'white' };
	padding-top: ${ props => props.paddingTop ? '100px' : '0' }; 
	padding-bottom: ${ props => props.paddingBottom ? '100px' : '0' };
	justify-content: center;
`

const Container = styled.div`
	width: 95%;
	position: relative; 
	display: flex; 
	align-items: ${ props => {
		if (props.align === 'center') return 'center'; 
		if (props.align === 'start') return 'start';
		return 'baseline';
	}};
	padding-top: ${ props => {
		if (props.padding === 'padTop') return `100px`;
		if (props.padding === 'extraPad') return `140px`;
		if (props.padding) return `${props.padding}px`;
		return 0;
	}};
	padding-bottom: ${ props => props.padding ? `${props.padding}px` : '0'};
	justify-content: ${ props => {
		if (props.justify === 'center') return 'center'; 
		if (props.justify === 'start') return 'flex-start';
		return 'space-around';
	}}; 
	max-width: ${ props => props.maxWidth ? props.maxWidth : '1200px' };
	min-height: ${ props => props.minHeight ? props.minHeight : '400px' };
	flex-wrap: wrap; 
`
