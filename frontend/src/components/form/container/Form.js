import React from 'react'
import PropTypes from 'prop-types'; 
import styled from 'styled-components';

const Form = ({ children, ...props }) => {
  return (
    <StyledForm {...props}>
      { children }
    </StyledForm>
  )
}

Form.propTypes = {
  children: PropTypes.any
}

export default Form

const StyledForm = styled.form`
  padding: 20px; 
  border-radius: 4px; 
	box-shadow: 10px 10px 25px -4px rgba(0,0,0,0.5);
  margin: 40px; 
  width: 90%; 
`