import styled from 'styled-components'
import DynamicQuote from '@/components/content/quote/DynamicQuote'
import PropTypes from 'prop-types'
import LinkUnderlineEffect from '@/components/generic/LinkUnderlineEffect'
import en from '@/language/locales/en/footer.json'
import es from '@/language/locales/es/footer.json'
import useLocale from '@/hooks/useLocale'
import Box from '@/components/generic/Box'

const Footer = ({ showQuote }) => {
	const t = useLocale() === 'en' ? en : es

	return (
    <>
			{showQuote && <DynamicQuote />}
			
			<Container data-testid='footer'>
				<Column>
					<p> { t.explore } </p>
					<div style={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						width: '100%', 
						flexWrap: 'wrap', 
						maxWidth: 550 
					}}>
						<LinkUnderlineEffect size="md" color="#222" hrefFormatted="/resources/program" text={t.programs} />
						<LinkUnderlineEffect size="md" color="#222" hrefFormatted="/resources/scholarships" text={t.scholarships} />
						<LinkUnderlineEffect size="md" color="#222" hrefFormatted="/resources/internships" text={t.internships} />
						<LinkUnderlineEffect size="md" color="#222" hrefFormatted="/resources/summer" text={t.summer} />
						<Box mt="8px">
							<LinkUnderlineEffect 
								size="md"
								openInNewTab
								hrefFormatted="https://www.leadlatinoamerica.org/copy-of-our-team" 
								color="#222"
								text={ t.ourTeam } 
							/>
						</Box>
						<LinkUnderlineEffect size="md" hrefFormatted="/add-program" text={ t.addYourOrg } color='#222'/>
					</div>
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
    width: 100vw; 
    display: flex; 
    padding-left: 20px; 
		box-shadow: inset 0px 2px 12px 2px rgba(184,177,184, .4);

`

const Column = styled.div`
    display: flex; 
    flex-direction: column; 
    padding: 20px;
    font-size: 24px;
		width: 100%;
    
    & > p:first-child {
        font-weight: 600;
        margin-bottom: 20px;
    }
`