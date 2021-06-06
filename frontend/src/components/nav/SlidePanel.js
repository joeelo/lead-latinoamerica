import styled from 'styled-components';
import Link from 'next/link';

const SlidePanel = ({ navOpen }) => {

  console.log(navOpen);

  return (
    <Container navOpen={ navOpen }>
        <p><Link href="#"> Programs </Link></p>
        <p><Link href="#"> Scholarships </Link></p>
        <p><Link href="#"> Internships </Link></p>
        <p><Link href="#"> Our Team </Link></p>
        <p><Link href="/add-edit-orgs"> Add your org </Link></p>
    </Container>
  )
}

export default SlidePanel;

const Container = styled.nav`
  z-index: 10000; 
  background-color: white; 
  width: 400px; 
  height: 100vh;
  position: absolute; 
  left: ${ props => props.navOpen === false ? '-400px' : '0'}; 
  padding: 10px;
  transition: .4s ease-in-out;
  padding: 50px 20px;

  a {
    margin-bottom: 10px;
    text-decoration: none;
    font-size: 22px;
    color: rgba(0, 119, 182, 1);
    display: inline-block;
    padding-bottom:2px;
    background-image: linear-gradient(#000, #000);
    background-position: 0 100%; /*OR bottom left*/
    background-size: 0% 2px;
    background-repeat: no-repeat;
    transition:
    background-size 0.3s,
    background-position 0s 0.3s; /*change after the size immediately*/
  }
  
  a:hover {
    background-position: 100% 100%; /*OR bottom right*/
    background-size: 100% 2px;
  }
`