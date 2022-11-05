import { useState } from 'react'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'

const Checkbox = ({ option, register, checkOnLoad = false }) => {
  const [isChecked, setIsChecked] = useState(checkOnLoad)
  const [checkmarkLength, setCheckmarkLength] = useState(null)

  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? '#4c8bf5' : 'white',
    borderColor: isChecked ? 'white' : 'grey',
  })

  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
  })

  if (!option?.value) return <></>
  return (
    <Container>
      <Label className="cbx">
        <Input
          name={option.value}
          value={option.value}
          type="checkbox"
          {...register(option.value)}
          onChange={() => setIsChecked(!isChecked)}
        />
        <animated.svg
          style={checkboxAnimationStyle}
          aria-hidden="true"
          className="checkbox"
          viewBox="0 0 15 11"
          fill="none"
        >
          <animated.path
            d="M2 4.5L5 9L13 1"
            strokeWidth="2"
            stroke="white"
            strokeDasharray={checkmarkLength}
            strokeDashoffset={checkmarkAnimationStyle.x}
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength())
              }
            }}
          />
        </animated.svg>
        {option.label}
      </Label>
    </Container>
  )
}

export default Checkbox

const Container = styled.div`
  display: flex;
`

const Label = styled.label`
  font-size: 16px;

  :hover {
    cursor: pointer;
  }

  .checkbox {
    display: inline-block;
    height: 20px;
    width: 20px;
    background: white;
    border: 1px solid grey;
    margin-right: 15px;
    margin-bottom: -5px;
    margin-top: 10px;
    border-radius: 2px;
  }
`

const Input = styled.input`
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: no-wrap;
  width: 1px;
`
