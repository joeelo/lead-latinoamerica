import styled from 'styled-components';
import Link from 'next/link';
import Button from '@/components/generic/Button';

const LinkButton = ({ 
    text, 
    hrefFormatted, 
    hrefAs, 
    marginLeft, 
    marginTop,
    bgColor = '#0077B6',
    width,
    external
}) => {

  if (external) {
    return (
      <a href={hrefFormatted} target="_blank" rel="noreferrer noopener">
        <StyledButton {...{bgColor, width}}>
          <Span> { text } </Span>
        </StyledButton>
      </a>
    )
  }

  return (
    <Link href={ hrefFormatted } as={`${ hrefAs }`}>
      <StyledButton {...{bgColor, width}}>
        <Span> { text } </Span>
      </StyledButton>
    </Link>
  )
}

export default LinkButton;

const StyledButton = styled(Button)` 
    color: white; 
    height: 60px;
    background-color: ${props => props.bgColor};
    width: ${props => props.width ? props.width : '175px'};

    &:hover {
      background-color: #07004D; 
    }
`

const Span = styled.span`
    color: white;   
    font-size: 22px;
`