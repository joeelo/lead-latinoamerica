import styled from 'styled-components'
import DynamicQuote from '@/components/content/quote/DynamicQuote'
import PropTypes from 'prop-types'
import LinkUnderlineEffect from '@/components/generic/LinkUnderlineEffect'
import en from '@/language/locales/en/footer.json'
import es from '@/language/locales/es/footer.json'
import useLocale from '@/hooks/useLocale'

const Footer = ({ showQuote }) => {
	const t = useLocale() === 'en' ? en : es

	return (
    <>
			{showQuote && <DynamicQuote />}
			
			<Container data-testid='footer'>
				<Column>
					<p> { t.explore } </p>
					<LinkUnderlineEffect color="#222" hrefFormatted="/resources/program" text={t.programs} />
					<LinkUnderlineEffect color="#222" hrefFormatted="/resources/scholarships" text={t.scholarships} />
					<LinkUnderlineEffect color="#222" hrefFormatted="/resources/internships" text={t.internships} />
					<LinkUnderlineEffect color="#222" hrefFormatted="/resources/summer" text={t.summer} />
					<LinkUnderlineEffect 
						openInNewTab
						hrefFormatted="https://www.leadlatinoamerica.org/copy-of-our-team" 
						color="#222"
						text={ t.ourTeam } 
					/>
					<LinkUnderlineEffect hrefFormatted="/add-program" text={ t.addYourOrg } color='#222'/>
					</Column>
			</Container>
		</>
	)
}

export default Footer

Footer.propTypes = {
    showQuote: PropTypes.bool
}

Footer.defaultProps = {
    showQuote: true
}

const Container = styled.div`
    min-height: 300px; 
    width: 100vw; 
    display: flex; 
    padding-left: 20px; 
		box-shadow: inset 0px 2px 12px 2px rgba(184,177,184, .4);

`

const Column = styled.div`
    display: flex; 
    flex-direction: column; 
    padding: 20px;
    font-size: 26px;
    
    & > p:first-child {
        font-weight: 600;
        margin-bottom: 20px;
    }
`