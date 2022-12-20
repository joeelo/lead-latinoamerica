import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '@/components/generic/Box'
import Popover from '../modal/Popover'
import { useSession, signOut } from 'next-auth/client'
import en from '@/language/locales/en/navbar.json'
import es from '@/language/locales/es/navbar.json'
import Link from 'next/link'
import useLocale from '@/hooks/useLocale'
import LanguageButtons from './LanguageButtons'

function DesktopNav() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [session] = useSession()
  const t = useLocale() === 'en' ? en : es

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleExternalMouseEnter = () => {
    setAnchorEl(null)
  }

  return (
    <Container>
      <Box display="flex" align="flex-start" ml="20px">
        <LanguageButtons />
      </Box>
      <Box
        display="flex"
        justify="flex-end"
        width="90vw"
        mw="100%"
        align="center"
      >
        <Box
          width="120px"
          onMouseEnter={handleMouseEnter}
          data-name="get-involved"
          style={{ cursor: 'pointer' }}
        >
          {t.portal}
        </Box>
        <Box
          width="110px"
          onMouseEnter={handleMouseEnter}
          data-name="resources"
          style={{ cursor: 'pointer' }}
        >
          {t.resources}
        </Box>
        <Box
          style={{ cursor: 'pointer' }}
          width="80px"
          onMouseEnter={handleExternalMouseEnter}
        >
          <Link href="/">{t.home}</Link>
        </Box>
        <Box
          width="100px"
          onMouseEnter={handleExternalMouseEnter}
          style={{ cursor: 'pointer' }}
        >
          {!session ? (
            <Link className="link" href="/sign-in">
              {t.signIn}
            </Link>
          ) : (
            <div className="link" href="/" onClick={signOut}>
              {t.signOut}
            </div>
          )}
        </Box>
      </Box>
      {anchorEl && anchorEl.dataset.name === 'get-involved' && (
        <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
          <Box className="link-container" fd="column" display="flex">
            <Link href="/add-program">{t.addOrg}</Link>
            <Link href="/profile">{t.profile}</Link>
            <a
              target="_blank"
              href="https://www.leadlatinoamerica.org/copy-of-our-team"
            >
              {t.ourTeam}
            </a>
          </Box>
        </Popover>
      )}
      {anchorEl && anchorEl.dataset.name === 'resources' && (
        <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
          <Box className="link-container" display="flex" fd="column">
            <Link href="/resources/program">{t.programs}</Link>
            <Link href="/resources/scholarships">{t.scholarships}</Link>
            <Link href="/resources/internships">{t.internships}</Link>
            <Link href="/resources/summer">{t.summer}</Link>
          </Box>
        </Popover>
      )}
    </Container>
  )
}

export default DesktopNav

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 30px 0;
  position: relative;
  font-size: 18px;
  display: flex;

  a {
    color: black;
    text-decoration: none;
  }

  a {
    margin: 3px 0;
  }
`
