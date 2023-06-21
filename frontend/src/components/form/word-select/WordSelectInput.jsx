import { useCallback, useEffect, useState } from 'react'
import Box from '@/components/generic/Box'
import styled from 'styled-components'

const WordSelectInput = ({ wordList, setWordList, placeHolder }) => {
  const [isInFocus, setIsInFocus] = useState(false)
  const [currentWord, setCurrentWord] = useState('')

  const handleKeyDown = useCallback(
    (event, blur) => {
      if (!isInFocus) {
        document.removeEventListener('keydown', this)
      }
      if (event.code === 'Enter' || event.code === 'Space' || blur) {
        if (currentWord === '') return
        event.preventDefault()

        const newWordList = [...wordList, currentWord]
        setWordList(newWordList)
        setCurrentWord('')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentWord, wordList, setWordList]
  )

  const handleCancelButtonClick = (selectedWord) => {
    const filteredWords = wordList.filter((word) => word !== selectedWord)
    setWordList(filteredWords)
  }

  useEffect(() => {
    ;(event) => handleKeyDown(event)

    document.addEventListener('keydown', handleKeyDown)

    if (!isInFocus) {
      removeEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, isInFocus])

  return (
    <>
      <Container focused={isInFocus}>
        <StyledInput
          onChange={(event) => {
            setCurrentWord(event.target.value)
          }}
          onFocus={() => setIsInFocus(true)}
          onBlur={(event) => {
            setIsInFocus(false)
            handleKeyDown(event, true)
          }}
          value={currentWord}
          placeholder={placeHolder}
        />
      </Container>
      <Box mt="5px" display="flex" wrap="true">
        {wordList.map((word, index) => {
          return (
            <StyledLabel key={index}>
              <span>{word}</span>
              <StyledCancelButton onClick={() => handleCancelButtonClick(word)}>
                x
              </StyledCancelButton>
            </StyledLabel>
          )
        })}
      </Box>
    </>
  )
}

export default WordSelectInput

const Container = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  padding-left: 10px;
  transition: 0.4s ease-in-out all;
  border-radius: 4px;
  box-shadow: ${(props) =>
    props.focused
      ? '1px 2px 13px 0px rgba(184, 177, 184, 1)'
      : '1px 1px 4px 0px rgba(184, 177, 184, 1)'};
`

const StyledInput = styled.input`
  width: 100%;
  min-height: 40px;
  height: 40px;
  font-size: 20px;
  padding: 5px 5px 2px 5px;
  margin-bottom: 10px;
  border: 0px;
  font-weight: lighter;

  &:focus {
    outline: none;
  }

  ::placeholder {
    font-size: 14px;
  }
`

const StyledLabel = styled.span`
  padding: 10px;
  margin-top: 15px;
  background-color: #1f2041;
  color: white;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCancelButton = styled.div`
  display: flex;
  color: white;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  border: 1px solid white;
  margin-left: 5px;
  font-size: 10px;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`
