import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import useOnScreen from '@/hooks/useOnScreen'

const ChangingBackgroundText = ({
  fontSize,
  initialColor,
  secondaryColor,
  text,
  fontColorInitial,
  fontColorSecondary,
  onlyRunOneTransition,
  maxWidth,
}) => {
  const ref = useRef()
  const [changeTextColor, setChangeTextColor] = useState(false)
  const [hasBeenOnScreen, setHasBeenOnScreen] = useState(false)
  let isOnScreen = useOnScreen(ref)

  useEffect(() => {
    if (hasBeenOnScreen && onlyRunOneTransition) {
      return
    }

    if (isOnScreen) {
      setChangeTextColor(true)

      setHasBeenOnScreen(true)
    }

    if (!onlyRunOneTransition && !isOnScreen) {
      setChangeTextColor(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnScreen])

  return (
    <Container ref={ref} {...{ maxWidth }}>
      <StyledHeading
        {...{ text, changeTextColor, fontColorInitial, fontColorSecondary }}
        style={{
          color: !changeTextColor ? fontColorInitial : fontColorSecondary,
        }}
      >
        {text}
      </StyledHeading>
      <InnerContainer
        {...{ fontSize, initialColor, secondaryColor, changeTextColor }}
      ></InnerContainer>
    </Container>
  )
}

export default ChangingBackgroundText

ChangingBackgroundText.propTypes = {
  fontSize: PropTypes.any,
  intialColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  text: PropTypes.string,
  fontColorInitial: PropTypes.string,
  fontColorSecondary: PropTypes.string,
}

ChangingBackgroundText.defaultProps = {
  fontSize: null,
  intialColor: '#222',
  secondaryColor: 'white',
  text: 'Im text!',
  fontColorInitial: 'white',
  fontColorSecondary: 'black',
}

const slideRight = keyframes`
	0% {
		width: 0%; 
	}
	30% {
		width: 15%; 
	}
	100% {
		width: 100%; 
	}
`

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '24px')};
  font-weight: ${(props) => (props.fontWeight ? '700' : '400')};
  position: relative;
  width: 90%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : '500px')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const InnerContainer = styled.div`
	position: absolute; 
	height: 100%; 
	left: 0; 
	top: 0; 
	background-color: 
	width: 0%;
	border-radius: 4px; 
	animation-name: ${(props) => (props.changeTextColor ? slideRight : null)}; 
	animation-duration: 3s;
	animation-fill-mode: forwards;
	background-color: ${(props) => props.secondaryColor}; 
`

const StyledHeading = styled.h2`
  z-index: 10;
  transition: 3s ease-in all;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
`
