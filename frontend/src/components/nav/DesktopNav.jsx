import Box from '@mui/material/Box'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'
import React, { useState } from 'react'

import Popover from '@/components/modal/Popover'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/navbar.json'
import es from '@/language/locales/es/navbar.json'

import LanguageButtons from './LanguageButtons'

export default function DesktopNav() {
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
    <Box
      width='100%'
      background-color='white'
      padding='30px 0'
      position='relative'
      fontSize='18px'
      display='flex'
      borderBottom='1px solid rgba(0, 0, 0, 0.1)'
      sx={{
      'a': {
          color: 'black',
          textDecoration: 'none',
          margin: '3px 0',
        }
      }}
    >
      <Box display="flex" alignItems="flex-start" ml="20px">
        <LanguageButtons />
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        width="90vw"
        maxWidth="100%"
        alignItems="center"
      >
        <Box
          width="120px"
          onPointerEnter={handleMouseEnter}
          data-name="get-involved"
          style={{ cursor: 'pointer' }}
          mr={4}
        >
          {t.portal}
        </Box>
        <Box
          width="110px"
          onPointerEnter={handleMouseEnter}
          data-name="resources"
          style={{ cursor: 'pointer' }}
          mr={4}
        >
          {t.resources}
        </Box>
        <Box
          style={{ cursor: 'pointer' }}
          width="80px"
          onPointerEnter={handleExternalMouseEnter}
          mr={4}
        >
          <Link href="/">{t.home}</Link>
        </Box>
        <Box
          width="100px"
          onPointerEnter={handleExternalMouseEnter}
          style={{ cursor: 'pointer' }}
          mr={2}
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
          <Box className="link-container" flexDirection="column" display="flex">
            <Link href="/add-program">{t.addOrg}</Link>
            {session && <Link href="/profile">{t.profile}</Link>}
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
          <Box className="link-container" display="flex" flexDirection="column">
            <Link href="/all-resources">{t.programs}</Link>
            <Link href="/local-resources">Local Resources</Link>
          </Box>
        </Popover>
      )}
    </Box>
  )
}