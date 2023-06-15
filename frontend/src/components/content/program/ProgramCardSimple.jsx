import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Link from 'next/link'
import { RemoveUserSavedProgram } from '@/fetch/user/UserRequests'
import { Tooltip } from 'react-tooltip'
import useIsMobile from '@/hooks/useIsMobile'

export default function ProgramCardSimple ({
  program,
  showDeleteButton = true,
  user,
  onSuccess,
}) {
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
      position="relative"
      mr={!isMobile ? 2.5 : 'auto'}
      maxWidth={300}
      tabIndex="0"
    >
      <Link href={`/resource/${program.href}`}>
        <Box
          borderRadius={4}
          minHeight={200}
          mt={2.5}
          mb={2.5}
          p={1.5}
          width="100%"
          style={{ 
            transition: '0.4s ease',
            boxShadow: isHovered 
              ? '4px 5px 17px 5px rgba(184,177,184, .8)'
              : '1px 2px 15px 0px rgba(184,177,184, .4)',
            cursor: 'pointer',
            backgroundImage: program.coverImage ? `url(${program.coverImage})` : '/images/pexels-cottonbro-6209356.jpg', 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            color: 'white',
          }}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <h3>{program.name}</h3>
        </Box>
      </Link>
      {showDeleteButton && (
        <>
          <Box
            justifyContent="center"
            display="flex"
            alignItems="center"
            data-tooltip-id="delete-button"
            data-tooltip-content='This will be removed from your saved programs'
            data-tooltip-variant='warning'
            className="delete-button"
            bgcolor="white"
            width={25}
            height={25}
            position="absolute"
            top="30px"
            right="10px"
            onClick={handleRemoveClick}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            style={{
              transition: '0.075s ease-in-out all',
              opacity: isHovered ? 0.9 : 0,
              cursor: 'pointer', 
              borderRadius: '50%'
            }}
          >
            <Image 
              alt="trash can svg"
              src="/images/svg/trash-icon.svg"
              width={13}
              height={13}
            />
          </Box>
        
          <Tooltip 
            id="delete-button"
          />
        </>
      )}
    </Box>
  )
}