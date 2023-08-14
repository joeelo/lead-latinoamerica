import styled from 'styled-components'

const Box = ({
  children,
  display,
  width,
  justify,
  align,
  pt,
  pb,
  mt,
  mb,
  mr,
  mw,
  wrap,
  center,
  p,
  flex,
  classNames,
  mobileProps,
  stackOnMobile,
  mobileWidth,
  ...props
}) => {
  return (
    <Container
      {...{
        width,
        display,
        justify,
        align,
        pt,
        pb,
        wrap,
        mt,
        mb,
        mr,
        mw,
        center,
        p,
        flex,
        mobileProps,
        stackOnMobile,
        mobileWidth,
      }}
      {...props}
      className={classNames}
    >
      {children}
    </Container>
  )
}

export default Box

const Container = styled.div`
  display: ${(props) => (props.display ? props.display : 'block')};
  flex-direction: ${(props) => (props.fd ? props.fd : 'unset')};
  max-width: ${(props) => (props.mw ? props.mw : '1200px')};
  width: ${(props) => {
    if (props.width === 'half') return '50%'
    if (props.width === 'al-fu') return '90%' //almost-full
    if (props.width) return props.width
    return '100%'
  }};
  justify-content: ${(props) => (props.justify ? props.justify : 'flex-start')};
  align-items: ${(props) => (props.align ? props.align : 'flex-start')};
  padding-top: ${(props) => props.pt};
  padding-bottom: ${(props) => props.pb};
  padding: ${(props) => (props.p ? props.p : null)};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : 'nowrap')};
  margin: ${(props) => (props.center ? '0 auto' : 0)};
  margin-top: ${(props) => (props.mt ? props.mt : null)};
  margin-bottom: ${(props) => (props.mb ? props.mb : null)};
  margin-right: ${(props) => (props.mr ? props.mr : null)};
  margin-left: ${(props) => (props.ml ? props.ml : null)};

  @media screen and (max-width: 768px) {
    width: ${(props) => (props.mobileWidth ? props.mobileWidth : '100%')};
    margin: 0 auto;
    flex-direction: ${(props) => (props.stackOnMobile ? 'column' : 'inherit')};
    padding: 10px;
  }
`
