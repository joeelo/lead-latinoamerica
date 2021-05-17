import styled from 'styled-components';

const CategoryTiles = ({ adjectives }) => {

  if (!adjectives) return <></>
  return (
    <Container>
      { adjectives.map(adj => <Tile> { adj } </Tile>)}
    </Container>
  )
}

export default CategoryTiles;

const Container = styled.div`
  width: 100%; 
  max-width: 400px; 
  display: flex; 
  flex-wrap: wrap; 
  margin-top: 20px; 
  margin-bottom: 40px; 
`

const Tile = styled.div`
  height: 50px; 
  padding: 0 20px; 
  border-radius: 50px; 
  background-color: #DA5552; 
  display: flex; 
  text-align: center; 
  align-items: center; 
  margin-right: 10px; 
  color: white; 
  margin-bottom: 10px;
`