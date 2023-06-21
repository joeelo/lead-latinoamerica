import LinkUnderlineEffect from '@/components/generic/LinkUnderlineEffect'
import styled from 'styled-components'

const TitleAndPhotoLinkBox = ({
  size,
  backgroundColor,
  content,
  color,
  minHeight,
}) => {
  return (
    <Container
      size={size}
      backgroundColor={backgroundColor}
      color={color}
      minHeight={minHeight}
    >
      {content.svg && <ContentPhoto src={`${content.svg}`} />}

      <ContentTitle> {content.title} </ContentTitle>
      <ContentText> {content.text} </ContentText>
      <ContentFooter>
        <LinkUnderlineEffect
          hrefFormatted={`/resources/${content.link}`}
          text={content.footer}
          color={'primary'}
        />
      </ContentFooter>
    </Container>
  )
}

export default TitleAndPhotoLinkBox

const Container = styled.div`
  display: flex;
  padding: 40px 20px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'white'};
  margin-bottom: 60px;
  box-sizing: border-box;
  color: ${(props) => (props.color ? props.color : '#222')};
  flex-direction: column;
  min-height: ${(props) =>
    props.minHeight ? `${props.minHeight}px` : '300px'};
  box-shadow: 5px 5px 17px 0px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: ${(props) => {
    if (props.size === 'halves') return '47%'
    if (props.size === 'thirds') return '31%'
    if (props.size === 'quarters') return '23%'
    return '100%'
  }};

  @media screen and (max-width: 768px) {
    flex: 0 0 95%;
    margin: 0 auto 40px auto;
    padding: 30px 10px;
  }
`

const ContentPhoto = styled.img`
  margin: 0 auto;
  max-width: 100px;
  min-height: 100px;
  max-height: 120px;

  @media screen and (max-width: 768px) {
    max-width: 70px;
    min-height: 70px;
    max-height: 90px;
  }
`

const ContentTitle = styled.h2`
  font-size: 48px;
  text-align: center;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 36px;
  }
`

const ContentText = styled.p`
  font-size: 24px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

const ContentFooter = styled.div`
  font-size: 26px;
  margin-top: auto;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;

  @media screen and (max-width: 768px) {
    margin-top: auto;
    padding-bottom: 20px;
  }
`
