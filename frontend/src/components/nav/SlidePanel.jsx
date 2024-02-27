import { signOut, useSession } from 'next-auth/client'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/navbar.json'
import es from '@/language/locales/es/navbar.json'

import LinkUnderlineEffect from '../generic/LinkUnderlineEffect'
import LanguageButtons from './LanguageButtons'

const SlidePanel = ({ navOpen }) => {
  const wrapperRef = useRef(null)
  const [session] = useSession()

  const t = useLocale() === 'en' ? en : es

  useEffect(() => {
    if (navOpen === true) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navOpen])

  return (
    <Container
      className="slide-panel"
      navOpen={navOpen}
      ref={wrapperRef}
    >
      <LanguageButtons />

      <SectionHeader> {t.resources} </SectionHeader>
      <LinkUnderlineEffect hrefFormatted="/all-resources/" text={t.programs} />

      <LinkUnderlineEffect
        hrefFormatted="/local-resources"
        text={t.resources}
      />

      <SectionHeader> {t.portal} </SectionHeader>

      {session && (
        <>
          <LinkUnderlineEffect hrefFormatted="/profile" text={t.profile} />

          <div onClick={signOut}>
            <LinkUnderlineEffect hrefFormatted="/" text={t.signOut} />
          </div>
        </>
      )}

      {!session && (
        <LinkUnderlineEffect hrefFormatted="/sign-in" text={t.signIn} />
      )}
      <LinkUnderlineEffect hrefFormatted="/add-program-q" text={t.addOrg} />
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
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 70px;
  left: ${(props) => (props.navOpen === false ? '-100vw' : '0')};
  padding: 10px;
  transition: 0.4s ease-in-out;
  padding: 50px 20px;
`

const SectionHeader = styled.p`
  font-size: 34px;
  margin-bottom: 10px;
  font-weight: 300;
  margin-top: 20px;
`
