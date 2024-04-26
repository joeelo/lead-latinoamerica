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
    <>
      <Box
        height={70}
        width="100%"
        bgcolor="white"
        marginBottom={2}
      />
        
      <Box
        width='100%'
        bgcolor='white'
        boxShadow='-11px 8px 11px 3px rgba(200, 200, 200, 0.3)'
        padding='20px 0'
        position='fixed'
        fontSize='18px'
        display='flex'
        zIndex={999999}
        top="0"
        sx={{
        'a': {
            color: 'black',
            textDecoration: 'none',
            margin: '5px 0',
          }
        }}
      >
        <Box display="flex" alignItems="flex-start" ml="20px" bgcolor="white">
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
            style={{ cursor: 'pointer' }}
            mr={1}
          >
            <span
              onPointerEnter={handleMouseEnter}
              data-name="get-involved"
              style={{ padding: '4px 0'}}
            >
              {t.portal}
            </span>
          </Box>
          <Box
            width="110px"
            style={{ cursor: 'pointer' }}
            mr={1}
          >
            <span
              data-name="resources"
              onPointerEnter={handleMouseEnter}
              style={{ padding: '4px 0'}}
            >
              {t.resources}
            </span>
          </Box>
          <Box
            style={{ cursor: 'pointer' }}
            width="80px"
            onPointerEnter={handleExternalMouseEnter}
            mr={1}
          >
            <Link href="/">{t.home}</Link>
          </Box>
          <Box
            width="100px"
            onPointerEnter={handleExternalMouseEnter}
            style={{ cursor: 'pointer' }}
            mr={1}
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
              <Link href="/add-program-q">{t.addOrg}</Link>
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
    </>
  )
}