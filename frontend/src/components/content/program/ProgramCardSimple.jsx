import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip'
import { RemoveUserSavedProgram } from '@/fetch/user/UserRequests'
import Box from '@/components/generic/Box'

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

  return (
    <Box
      style={{ position: 'relative', marginRight: 20 }}
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
            data-tip
            data-for="delete-button"
            className="delete-button"
            isHovered={isHovered}
            onClick={handleRemoveClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>x</span>
          </StyledDeleteButton>
          <ReactTooltip
            id="delete-button"
            effect="solid"
            type="warning"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>
              Clicking this will remove this program from your saved programs
            </span>
          </ReactTooltip>
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
      ? '2px 2px 15px 0px rgba(184, 177, 184, 1)'
      : '1px 1px 12px 5px rgba(184, 177, 184, 1)'};
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
  background-color: #ce2029;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 30px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  box-shadow: 1px 2px 3px -1px rgba(0, 0, 0, 1);
  transition: 0.075s ease-in-out all;
  opacity: ${(props) => (props.isHovered ? 0.9 : 0)};

  &:hover {
    box-shadow: 2px 4px 8px -1px rgba(0, 0, 0, 1);
    cursor: pointer;
  }

  span {
    margin-bottom: 1px;
    font-size: 14px;
  }
`
