import styled from 'styled-components';

const FlexContentBox = ({ size, backgroundColor, content, color }) => {
  return (
    <Container 
      size={ size }
      backgroundColor={ backgroundColor }
      color={ color }
    >
      <ContentTitle> { content.title } </ContentTitle>
      <ContentText> { content.text } </ContentText>
      <ContentFooter> { content.footer } </ContentFooter>
    </Container>
  )
}

export default FlexContentBox;

const Container = styled.div`
  display: flex;
  padding: 20px; 
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'white' };
  margin-bottom: 100px; 
  box-sizing: border-box; 
  color: ${ props => props.color ? props.color : '#222' };
  flex-direction: column; 
  min-height: 300px;
  width: ${props => {
    if (props.size === 'halves') return '48%';
    if (props.size === 'thirds') return '31%';
    if (props.size === 'quarters') return '23%';
    return '100%';
  }};
  
  @media screen and (max-width: 768px) {
    flex: 0 0 95%; 
    margin: 0 auto; 
    padding: 10px; 
  }
`

const ContentTitle = styled.h2`
  font-size: 58px; 
  text-align: center;
  margin-bottom: 20px; 
`

const ContentText = styled.p`
  font-size: 26px; 
  text-align: center;

`

const ContentFooter = styled.p`
  font-size: 26px; 
  margin-top: auto; 
  text-align: center; 
  cursor: pointer; 
  text-decoration: underline; 
`