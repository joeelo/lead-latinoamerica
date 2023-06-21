import { React, useEffect, useState } from 'react'
import Hamburger from '@/components/nav/Hamburger'
import SlidePanel from './SlidePanel'
import styled from 'styled-components'
import { useRouter } from 'next/router'

function MobileNav() {
  const [navOpen, setNavOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (navOpen) {
      setNavOpen(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return (
    <>
      <PlaceHolderContainer></PlaceHolderContainer>
      <Container>
        <Hamburger {...{ navOpen, setNavOpen }} />
        <SlidePanel {...{ navOpen, setNavOpen }} />
      </Container>
    </>
  )
}

export default MobileNav

const Container = styled.div`
  width: 100vw;
  background-color: white;
  position: fixed;
  min-height: 70px;
  top: 0;
  z-index: 1000;
  box-shadow: 3px 0px 35px -4px rgba(156, 156, 156, 1);
`

const PlaceHolderContainer = styled.div`
  // To take up the fixed height at the top of page and force content down
  height: 70px;
  width: 100vw;
  background-color: white;
  z-index: 1000;
`
