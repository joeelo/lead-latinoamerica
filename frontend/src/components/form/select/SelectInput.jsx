import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@/components/generic/Box';
import useHandleClickOutside from '@/hooks/useHandleClickOutside';

const SelectInput = ({ options, register, setValue, name }) => {
  const wrapperRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const handleClick = (opt) => {
    setSelectedOption(opt);
    setValue(name, opt.value);
  };

  const cb = () => {
    setShowOptions(false);
  };

  useHandleClickOutside(wrapperRef, cb);

  return (
    <Box style={{ position: 'relative' }}>
      <StyledInput
        {...register(name)}
        readOnly
        value={selectedOption.label || ''}
        onClick={() => setShowOptions(true)}
        ref={wrapperRef}
        focused={showOptions}
      />
      {showOptions && (
        <Box mw="350px" display="flex" fd="column">
          <StyledOptionDropdown focused={showOptions}>
            {options.map((opt) => {
              return (
                <StyledOption key={opt.value} onClick={() => handleClick(opt)}>
                  {opt.label}
                </StyledOption>
              );
            })}
          </StyledOptionDropdown>
        </Box>
      )}
    </Box>
  );
};

SelectInput.propTypes = {
  options: PropTypes.array.isRequired,
  extend: PropTypes.bool,
};

export default SelectInput;

const StyledInput = styled.input`
  max-width: 350px;
  width: 90%;
  box-shadow: ${(props) =>
    props.focused
      ? '1px 2px 13px 0px rgba(184, 177, 184, 1)'
      : '1px 1px 4px 0px rgba(184, 177, 184, 1)'};
  min-height: 60px;
  -webkit-appearance: none;
  outline: none;
  border: 0;
  background-color: white;
  -moz-appearance: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 18px;
  transition: 0.4s ease all;
  z-index: ${(props) => (props.focused ? 100 : 1)};

  :hover {
    cursor: pointer;
  }
`;

const StyledOptionDropdown = styled.div`
  width: 100%;
  position: absolute;
  top: 60px;
  max-width: 352px;
  left: -1px;
  z-index: 10;
  box-shadow: ${(props) =>
    props.focused ? '3px 7px 10px 0px rgba(184,177,184,.4)' : 0};

  & > :first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const StyledOption = styled.div`
  transition: 0.4s ease all;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 0;
  background-color: white;

  :hover {
    cursor: pointer;
    background-color: lightblue;
  }
`;
