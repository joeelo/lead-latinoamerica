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
      <ContentTitle> { content.title } </ContentTitle>
      <ContentText> { content.text } </ContentText>
      <Link href={`/resources/[slug]`} as={`/resources/${content.title.toLowerCase()}`}>
        <ContentFooter> { content.footer } </ContentFooter>
      </Link>
    </Container>
  )
}

export default FlexContentBox;

const Container = styled.div`
  display: flex;
  padding: 20px; 
  border-radius: 4px;
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'white' };
  margin-bottom: 60px;
  box-sizing: border-box; 
  color: ${ props => props.color ? props.color : '#222' };
  flex-direction: column; 
  min-height: ${props => props.minHeight ? `${props.minHeight}px` : '250px'};
  width: ${props => {
    if (props.size === 'halves') return '48%';
    if (props.size === 'thirds') return '31%';
    if (props.size === 'quarters') return '23%';
    return '100%';
  }};
  
  
  @media screen and (max-width: 768px) {
    flex: 0 0 95%; 
    margin: 0 auto 40px auto; 
    padding: 10px; 
    min-height: 250px;
  }
`

const ContentTitle = styled.h2`
  font-size: 48px; 
  text-align: center;
  margin-bottom: 10px; 
  
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
  
  const ContentFooter = styled.p`
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