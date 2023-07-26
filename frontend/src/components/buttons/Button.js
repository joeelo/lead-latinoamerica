import Image from 'next/image'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Button = ({ label, color, onClick, isSubmitting = false, ...props }) => {
  return (
    <Container onClick={onClick} {...{ color }} {...props}>
      <span>
        {isSubmitting ? (
          <Image
            alt=""
            style={{
              border: 0,
              outline: 0,
              maxWidth: 35,
            }}
            src="/loaders/spinning-loader.svg"
          />
        ) : (
          label
        )}
      </span>
    </Container>
  )
}

Button.defaultProps = {
  color: '#1F2041',
}

Button.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
}

export default Button

const Container = styled.button`
  width: 160px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: ${(props) => (props.color ? props.color : 'blue')};
  border: 0;
  margin-top: 30px;
  color: white;
  font-size: 16px;
  transition: 0.4s ease all;
  font-size: 22px;

  :hover {
    cursor: pointer;
    background-color: #3a3970;
  }
`
