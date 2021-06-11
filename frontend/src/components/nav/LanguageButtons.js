import styled from 'styled-components';

const LanguageButtons = () => {
  return (
    <Container>
      <Button> EN </Button>
      <CenterDivider></CenterDivider>
      <Button> ES </Button>
    </Container>
  )
}

export default LanguageButtons;

const Container = styled.div`
  display: flex; 
  align-items: center;
  margin-bottom: 20px; 
`

const Button = styled.span`
  font-size: 34px;
  cursor: pointer;
`

const CenterDivider = styled.div`
  height: 20px; 
  width: 2px; 
  background-color: black; 
  margin: 0 10px; 
`