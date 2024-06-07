import PropTypes from 'prop-types'
import React from 'react'

import Button from '@/components/buttons/Button'

const ExternalLink = ({
  bgColor,
  label,
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
      <Button
        label={label}
        color={bgColor}
        hoverColor={hoverColor}
      />
        
    </a>
  )
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  buttonProps: PropTypes.any,
  children: PropTypes.any,
}

export default ExternalLink
