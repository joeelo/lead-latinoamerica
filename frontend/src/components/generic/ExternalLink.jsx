import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@/components/generic/Button';

const ExternalLink = ({
  bgColor,
  buttonProps,
  children,
  href,
  hoverColor,
  ...props
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        display: 'inline-block',
      }}
      {...props}
    >
      <StyledButton {...{ bgColor, hoverColor }}>
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
  width: ${(props) => (props.width ? props.width : '195px')};

  &:hover {
    background-color: ${(props) =>
      props.hoverColor ? props.hoverColor : '#07004d'};
  }
`;

const Span = styled.span`
  color: white;
  font-size: 22px;
`;
