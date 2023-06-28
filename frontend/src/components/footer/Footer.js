import Box from '@mui/material/Box'
import DynamicQuote from '@/components/content/quote/DynamicQuote'
import en from '@/language/locales/en/footer.json'
import es from '@/language/locales/es/footer.json'
import LinkUnderlineEffect from '@/components/generic/LinkUnderlineEffect'
import useLocale from '@/hooks/useLocale'

export default function Footer({ showQuote = true, fixed = false }) {
  const t = useLocale() === 'en' ? en : es

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      mt={16}
      position={fixed ? 'fixed' : 'inherit'}
      bottom={fixed ? 0 : ''}
    >

      {showQuote && <DynamicQuote />}

      <Box
        width="100vw"
        display="flex"
        pl={2.5}
        style={{
          boxShadow: 'inset 0px 2px 12px 2px rgba(184, 177, 184, 0.4)',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          p={2.5}
          fontSize={22}
          width="100%"
        >
          <p style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
            {' '}
            {t.explore}{' '}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              maxWidth: 550,
            }}
          >
            <LinkUnderlineEffect
              size="md"
              color="#222"
              hrefFormatted="/resources/program"
              text={t.programs}
            />
            <LinkUnderlineEffect
              size="md"
              color="#222"
              hrefFormatted="/resources/scholarships"
              text={t.scholarships}
            />
            <LinkUnderlineEffect
              size="md"
              color="#222"
              hrefFormatted="/resources/internships"
              text={t.internships}
            />
            <LinkUnderlineEffect
              size="md"
              color="#222"
              hrefFormatted="/resources/summer"
              text={t.summer}
            />
          </div>

          <LinkUnderlineEffect
            size="md"
            openInNewTab
            hrefFormatted="https://www.leadlatinoamerica.org/copy-of-our-team"
            color="#222"
            text={t.ourTeam}
          />

          <LinkUnderlineEffect
            size="md"
            hrefFormatted="/add-program"
            text={t.addYourOrg}
            color="#222"
          />
        </Box>
      </Box>
    </Box>
  )
}
