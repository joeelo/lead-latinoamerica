import styled from 'styled-components';
import Link from 'next/link';
import DynamicQuote from '../content/quote/DynamicQuote';

const Footer = ({ marginTop, showQuote = true }) => {
    return (
        <>
            { showQuote && <DynamicQuote /> }
            <Container data-testid='footer' marginTop={ marginTop }>
                <Column>
                <p>Explore</p>
                <p><Link href="#"> Programs </Link></p>
                <p><Link href="#"> Scholarships </Link></p>
                <p><Link href="#"> Internships </Link></p>
                <p><Link href="#"> Our Team </Link></p>
                <p><Link href="/add-edit-orgs"> Add your org </Link></p>
                </Column>
            </Container>
        </>
    )
}

export default Footer;

const Container = styled.div`
    min-height: 300px; 
    background-color: white;
    width: 100vw; 
    display: flex; 
    padding-left: 20px; 
    margin-top: ${ props => props.marginTop ? '200px' : 0 };
`

const Column = styled.div`
    display: flex; 
    flex-direction: column; 
    padding: 20px;
    font-size: 26px;
    line-height: 36px;
    
    & > p:first-child {
        font-weight: bold;
        margin-bottom: 20px;
    }

    a {
        color: inherit;
        text-decoration: none;
        transition: .2s ease-in-out all;
        border-bottom: 1px solid rgba(0, 0, 0, 0);
    }

    a:hover {
        border-bottom: 1px solid rgba(0, 119, 182, 1);
        color: rgba(0, 119, 182, 1);
    }

    @media screen and (max-width: 768px) {
        font-size: 22px;
        padding: 20px 20px 0 0;
    }
`