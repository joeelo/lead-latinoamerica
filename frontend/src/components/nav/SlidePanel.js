import styled from 'styled-components';
import Link from 'next/link';
import LanguageButtons from './LanguageButtons';

const SlidePanel = ({ navOpen }) => {

  return (
    <Container navOpen={ navOpen }>
        <LanguageButtons />
        <SectionHeader>Student Resources</SectionHeader>
        <p><Link href="#"> Sign in </Link></p>
        <p><Link href="#"> Programs </Link></p>
        <p><Link href="#"> Scholarships </Link></p>
        <p><Link href="#"> Internships </Link></p>

        <SectionHeader>Org Portal</SectionHeader>
        <p><Link href="/add-edit-orgs"> Add your Org </Link></p>
        <p><Link href="#"> Partner with us </Link></p>

        <BottomSection>
            <Link href="/frequently-asked-questions">FAQ</Link>
            <br/>
            <Link href="/mission-statement">Our Mission</Link>
        </BottomSection>

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
  top: 70px;
  left: ${ props => props.navOpen === false ? '-400px' : '0'}; 
  padding: 10px;
  transition: .4s ease-in-out;
  padding: 50px 20px;
  box-shadow: ${props => props.navOpen ? '5px 5px 9px -2px #000000' : 'none'} ; 

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

const BottomSection = styled.div`
  margin-top: 40px; 
`

const SectionHeader = styled.p`
  font-size: 34px;
  margin-bottom: 5px; 
  font-weight: 300;
  margin-top: 20px;

  a {
    font-size: 26px; 
    color: rgba(0, 119, 182, 1);
  }
`