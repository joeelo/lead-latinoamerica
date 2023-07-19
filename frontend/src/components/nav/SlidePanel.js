import { signOut, useSession } from 'next-auth/client'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/navbar.json'
import es from '@/language/locales/es/navbar.json'

import LinkUnderlineEffect from '../generic/LinkUnderlineEffect'
import LanguageButtons from './LanguageButtons'

const SlidePanel = ({ navOpen, setNavOpen }) => {
  const wrapperRef = useRef(null)
  const [session] = useSession()

  const handleClickOutside = (event) => {
    if (!navOpen) return
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setNavOpen(false)
    }
  }

  const t = useLocale() === 'en' ? en : es

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    if (navOpen === true) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }

    return () => document.removeEventListener('click', handleClickOutside)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navOpen])

  return (
    <Container
      className="slide-panel"
      navOpen={navOpen}
      ref={wrapperRef}
      onClick={(event) => handleClickOutside(event)}
    >
      <LanguageButtons />

      <SectionHeader> {t.resources} </SectionHeader>
      <LinkUnderlineEffect
        hrefFormatted="/resources/program"
        text={t.programs}
      />
      <LinkUnderlineEffect
        hrefFormatted="/resources/scholarships"
        text={t.scholarships}
      />
      <LinkUnderlineEffect
        hrefFormatted="/resources/internships"
        text={t.internships}
      />
      <LinkUnderlineEffect hrefFormatted="/resources/summer" text={t.summer} />

      <SectionHeader> {t.portal} </SectionHeader>
      {session && (
        <>
          <LinkUnderlineEffect hrefFormatted="/profile" text="My Profile" />
          <div onClick={signOut}>
            <LinkUnderlineEffect hrefFormatted="/" text="Log Out" />
          </div>
        </>
      )}

      {!session && (
        <LinkUnderlineEffect hrefFormatted="/sign-in" text="Sign In" />
      )}
      <LinkUnderlineEffect hrefFormatted="/add-program" text={t.addOrg} />
      <LinkUnderlineEffect hrefFormatted="/" text={t.home} />
      <LinkUnderlineEffect
        openInNewTab
        hrefFormatted="https://www.leadlatinoamerica.org/copy-of-our-team"
        text={t.ourTeam}
      />
    </Container>
  )
}

export default SlidePanel

const Container = styled.nav`
  z-index: 10000;
  background-color: white;
  width: 400px;
  height: 100vh;
  position: absolute;
  top: 70px;
  left: ${(props) => (props.navOpen === false ? '-400px' : '0')};
  padding: 10px;
  transition: 0.4s ease-in-out;
  padding: 50px 20px;
  box-shadow: ${(props) =>
    props.navOpen ? '3px 15px 25px -4px rgba(156,156,156,1)' : 'none'};
`

const SectionHeader = styled.p`
  font-size: 34px;
  margin-bottom: 10px;
  font-weight: 300;
  margin-top: 20px;
`
