import styled from 'styled-components';
import Link from 'next/link';
import DynamicQuote from '../content/quote/DynamicQuote';
import PropTypes from 'prop-types';

const Footer = ({ showQuote }) => {
    return (
        <>
            { showQuote && <DynamicQuote /> }
            <Container data-testid='footer'>
                <Column>
                <p>Explore</p>
                <p><Link href="/resources/programs"> Programs </Link></p>
                <p><Link href="/resources/scholarships"> Scholarships </Link></p>
                <p><Link href="/resources/internships"> Internships </Link></p>
                <p><Link href="/our-team"> Our Team </Link></p>
                <p><Link href="/add-edit-orgs"> Add your org </Link></p>
                </Column>
            </Container>
        </>
    )
}

export default Footer;

Footer.propTypes = {
    showQuote: PropTypes.bool
}

Footer.defaultProps = {
    showQuote: true
}

const Container = styled.div`
    min-height: 300px; 
    background-color: white;
    width: 100vw; 
    display: flex; 
    padding-left: 20px; 
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