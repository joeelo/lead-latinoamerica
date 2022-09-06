import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '@/components/generic/Box'
import Popover from '../modal/Popover'
import { useSession, signOut } from 'next-auth/client'
import en from '@/language/locales/en/navbar.json'
import es from '@/language/locales/es/navbar.json'
import Link from 'next/link'
import useLocale from '@/hooks/useLocale'

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

  console.log('SESSION : ', session)

  return (
    <Container>
      <Box display="flex" justify="flex-end" width="100vw" mw="100%">
        <Box
          width="120px"
          onMouseEnter={handleMouseEnter}
          data-name="get-involved"
          style={{ cursor: 'pointer' }}
        >
          Get Involved
        </Box>
        <Box
          width="100px"
          onMouseEnter={handleMouseEnter}
          data-name="resources"
          style={{ cursor: 'pointer' }}
        >
          Resources
        </Box>
        <Box style={{ cursor: 'pointer' }} width="80px">
          <Link onMouseEnter={handleExternalMouseEnter} href="/">
            Home
          </Link>
        </Box>
        <Box
          width="100px"
          onMouseEnter={handleExternalMouseEnter}
          style={{ cursor: 'pointer' }}
        >
          {!session ? (
            <Link className="link" href="/sign-in">
              Login
            </Link>
          ) : (
            <div className="link" href="/" onClick={signOut}>
              Sign out
            </div>
          )}
        </Box>
      </Box>

      {anchorEl && anchorEl.dataset.name === 'get-involved' && (
        <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
          <Box fd="column" display="flex">
            <Link href="/add-program">{t.addOrg}</Link>
            <Link href="/profile">{t.addOrg}</Link>
            <a
              target="_blank"
              href="https://www.leadlatinoamerica.org/copy-of-our-team"
            >
              Our Team
            </a>
          </Box>
        </Popover>
      )}

      {anchorEl && anchorEl.dataset.name === 'resources' && (
        <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
          <Box display="flex" fd="column">
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

  a {
    color: black;
    text-decoration: none;
  }
`
