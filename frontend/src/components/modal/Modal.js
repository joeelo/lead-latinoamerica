import styled from 'styled-components'
import { useEffect, useRef } from 'react'

const Modal = ({ isOpen, setOpen, children }) => {
  const wrapperRef = useRef()

  const handleClickOutside = (event) => {
    if (!isOpen) return
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  })

  if (!isOpen) return <></>
  return (
    <Container ref={wrapperRef} className="modal">
      {children}
    </Container>
  )
}

export default Modal

const Container = styled.div`
  position: fixed;
  top: 200px;
  background-color: #f9f9f9;
  min-width: 500px;
  border-radius: 4px;
  min-height: 300px;
  z-index: 10000;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 3px 0px 35px -4px rgba(156, 156, 156, 1);
  padding: 20px;
`
