import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ label, color, onClick, ...props }) => {

  const handleClick = () => {
    if (onClick) {
      onClick(); 
    }

    return null; 
  }

  return (
    <Container onClick={onClick} {...{color}} {...props}>
      { label }
    </Container>
  )
}

Button.defaultProps = {
  color: '#1F2041'
}

Button.propTypes = {
  label: PropTypes.string, 
  color: PropTypes.string,
}

export default Button;

const Container = styled.button`
  width: 150px; 
  height: 50px; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  outline: 1px solid rgba(0, 0, 0, .2);
  border-radius: 4px; 
  background-color: ${ props => props.color ? props.color : 'blue' };
  border: 0; 
  margin-top: 30px; 
  color: white;
  font-size: 18px;
  transition: .4s ease all; 

  :hover {
    cursor: pointer;
    background-color: #3a3970; 
  }
`
