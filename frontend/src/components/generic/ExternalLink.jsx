import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@/components/generic/Button';

const ExternalLink = ({ href, buttonProps, children, ...props }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      <StyledButton>
        <Span>{children}</Span>
      </StyledButton>
    </a>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  buttonProps: PropTypes.any,
  children: PropTypes.any,
};

export default ExternalLink;

const StyledButton = styled(Button)`
  color: white;
  height: 60px;
  background-color: ${(props) => props.bgColor};
  width: ${(props) => (props.width ? props.width : '175px')};

  &:hover {
    background-color: #07004d;
  }
`;

const Span = styled.span`
  color: white;
  font-size: 22px;
`;
