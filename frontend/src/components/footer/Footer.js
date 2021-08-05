import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import Link from 'next/link';
import DynamicQuote from '../content/quote/DynamicQuote';
import PropTypes from 'prop-types';
import LinkUnderlineEffect from '@/components/generic/LinkUnderlineEffect';

const Footer = ({ showQuote }) => {

    const theme = useContext(ThemeContext);

    return (
        <>
            { showQuote && <DynamicQuote /> }
            <Container data-testid='footer' theme={ theme }>
                <Column>
                <p>Explore</p>
                    <LinkUnderlineEffect hrefFormatted="/resources/programs" text={ 'Programs' } color={'white'}/>
                    <LinkUnderlineEffect hrefFormatted="/resources/internships" text={ 'Internships' } color={'white'}/>
                    <LinkUnderlineEffect hrefFormatted="/our-team" text={ 'Our Team' } color={'white'}/>
                    <LinkUnderlineEffect hrefFormatted="/resources/add-edit-orgs" text={ 'Add your org' } color={'white'}/>
                    <LinkUnderlineEffect hrefFormatted="/resources/programs" text={ 'Programs' } color={'white'}/>
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
    background-color: ${ props => props.theme.colors.cyan };
    width: 100vw; 
    display: flex; 
    padding-left: 20px; 
    color: white;
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