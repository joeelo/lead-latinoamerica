import styled from 'styled-components'

const Tiles = ({ adjectives }) => {
  if (!adjectives) return <></>
  return (
    <Container>
      {adjectives.map((adj) => (
        <Tile key={adj}> {adj} </Tile>
      ))}
    </Container>
  )
}

export default Tiles

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 40px;

  @media screen and (max-width: 768px) {
    margin-bottom: 0;
  }
`

const Tile = styled.div`
  height: 45px;
  padding: 0 15px;
  border-radius: 50px;
  background-color: #da5552;
  display: flex;
  text-align: center;
  align-items: center;
  margin-right: 10px;
  color: white;
  margin-bottom: 10px;
  font-size: 16px;
`
