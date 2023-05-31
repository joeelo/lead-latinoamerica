import React, { useState } from 'react'
import Box from '@/components/generic/Box'
import Image from 'next/image'
import Link from 'next/link'
import { RemoveUserSavedProgram } from '@/fetch/user/UserRequests'
import styled from 'styled-components'
import { Tooltip } from 'react-tooltip'
import useIsMobile from '@/hooks/useIsMobile'

const ProgramCardSimple = ({
  program,
  showDeleteButton = true,
  user,
  onSuccess,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleRemoveClick = async () => {
    const response = await RemoveUserSavedProgram(user.email, program._id)

    if (response.success) {
      onSuccess()
    }
  }

  const isMobile = useIsMobile()

  return (
    <Box
      style={{
        position: 'relative',
        marginRight: !isMobile ? '20px' : 'auto',
      }}
      mw="300px"
      tabIndex="0"
    >
      <Link href={`/resource/${program.href}`}>
        <Container
          isHovered={isHovered}
          bgImage={program.coverImage || '/images/pexels-cottonbro-6209356.jpg'}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h3>{program.name}</h3>
        </Container>
      </Link>
      {showDeleteButton && (
        <>
          <StyledDeleteButton
            data-tooltip-id="delete-button"
            data-tooltip-content='This will be removed from your saved programs'
            data-tooltip-variant='warning'
            className="delete-button"
            isHovered={isHovered}
            onClick={handleRemoveClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image 
              alt="trash can svg"
              src="/images/svg/trash-icon.svg"
              width={13}
              height={13}
            />
          </StyledDeleteButton>
        
          <Tooltip 
            id="delete-button"
          />
        </>
      )}
    </Box>
  )
}

export default ProgramCardSimple

const Container = styled.div`
  border-radius: 4px;
  width: 100%;
  box-shadow: ${(props) =>
    props.isHovered
      ? '4px 5px 17px 5px rgba(184,177,184, .8)'
      : '1px 2px 15px 0px rgba(184,177,184, .4)'};
  min-height: 200px;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
  transition: 0.4s ease;
  margin-bottom: 20px;
  background-image: ${(props) => 'url(' + props.bgImage + ')'};
  background-size: cover;
  background-repeat: no-repeat;
  color: white;

  & > .delete-button:hover {
    box-shadow: 2px 2px 15px 0px rgba(184, 177, 184, 1);
  }

  :last-child {
    margin-bottom: 40px;
  }
`

const StyledDeleteButton = styled.div`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 30px;
  cursor: pointer;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.075s ease-in-out all;
  opacity: ${(props) => (props.isHovered ? 0.9 : 0)};
`
