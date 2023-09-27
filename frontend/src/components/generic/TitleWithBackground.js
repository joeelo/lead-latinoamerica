import styled from 'styled-components'

export default function TitleWithBackground({
  text = 'title',
  topOffset,
  color,
  backgroundColor,
  absolute = false,
}) {
  return (
    <TitleContainer topOffset={topOffset} absolute={absolute}>
      <Title backgroundColor={backgroundColor} color={color}>
        {text}
      </Title>
    </TitleContainer>
  )
}

const TitleContainer = styled.div`
  top: ${(props) => (props.topOffset ? `${props.topOffset}px` : 'auto')};
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  position: ${(props) => (props.absolute ? 'absolute' : 'relative')};
  justify-content: center;
  width: 100vw;
  text-transform: capitalize;
`

const Title = styled.h2`
  margin: 0 auto;
  position: relative;
  padding: 20px;
  width: 90vw;
  max-width: 800px;
  font-size: 68px;
  text-align: center;
  z-index: 2;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'white'};
  border-radius: 4px;
  color: ${(props) => (props.color ? props.color : 'inherit')};

  @media screen and (max-width: 768px) {
    font-size: 34px;
  }
`
