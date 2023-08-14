import styled from 'styled-components'

const LoadingSpinner = () => {
  return (
    <Container>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  )
}

export default LoadingSpinner

const Container = styled.div`
  min-height: 50px;
  min-width: 100%;
  max-height: 50px;
  margin: 200px 0;
  display: flex;
  justify-content: center;
`
