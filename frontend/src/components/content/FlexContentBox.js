import { useState, useRef, useEffect } from 'react'; 
import styled from 'styled-components';
import Link from 'next/link';

const FlexContentBox = ({ size, backgroundColor, content, color, minHeight }) => {
  const ref = useRef();
  
  useEffect(() => {
    const tallestDiv = ref.current.clientHeight;
  },[ref?.current])

  return (
    <Container 
      size={ size }
      backgroundColor={ backgroundColor }
      color={ color }
      ref={ ref }
      minHeight={ minHeight }
    >
      { content.svg && <ContentPhoto src={`${ content.svg }`} /> }
      <ContentTitle> { content.title } </ContentTitle>
      <ContentText> { content.text } </ContentText>
      <ContentFooter> 
        <Link href={`/resources/[slug]`} as={`/resources/${content.title.toLowerCase()}`}>
          { content.footer }
        </Link>        
      </ContentFooter>
    </Container>
  )
}

export default FlexContentBox;

const Container = styled.div`
  display: flex;
  padding: 40px 20px; 
  border-radius: 4px;
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'white' };
  margin-bottom: 60px;
  box-sizing: border-box; 
  color: ${ props => props.color ? props.color : '#222' };
  flex-direction: column; 
  min-height: ${props => props.minHeight ? `${props.minHeight}px` : '300px'};
  min-height: 500px;
  max-width: 600px;
  width: ${props => {
    if (props.size === 'halves') return '47%';
    if (props.size === 'thirds') return '31%';
    if (props.size === 'quarters') return '23%';
    return '100%';
  }};
  
  
  @media screen and (max-width: 768px) {
    flex: 0 0 95%; 
    margin: 0 auto 40px auto; 
    padding: 10px; 
  }

  a {
    margin-bottom: 10px;
    text-decoration: none;
    font-size: 22px;
    color: rgba(0, 119, 182, 1);
    display: inline-block;
    padding-bottom:2px;
    background-image: linear-gradient(#000, #000);
    background-position: 0 100%; /*OR bottom left*/
    background-size: 0% 2px;
    background-repeat: no-repeat;
    transition:
    background-size 0.3s,
    background-position 0s 0.3s; /*change after the size immediately*/
  }
  
  a:hover {
    background-position: 100% 100%; /*OR bottom right*/
    background-size: 100% 2px;
  }
`

const ContentPhoto = styled.img`
  margin: 0 auto; 
  max-width: 100px; 
  min-height: 100px; 
  max-height: 120px; 
`

const ContentTitle = styled.h2`
  font-size: 48px; 
  text-align: center;
  margin-bottom: 20px; 
  
  @media screen and (max-width: 768px) {
    margin-bottom: 10px; 
  }
`

const ContentText = styled.p`
  font-size: 24px; 
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 22px; 
  }
`
  
const ContentFooter = styled.div`
  font-size: 26px; 
  margin-top: auto; 
  text-align: center; 
  cursor: pointer; 
  text-decoration: underline; 

  @media screen and (max-width: 768px) {
    font-size: 22px;
    margin-top: auto;
  }
`