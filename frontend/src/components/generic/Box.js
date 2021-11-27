import styled from "styled-components";

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
  wrap, 
  center, 
  p,
  flex,
  classNames,
  mobileProps,
  ...props 
}) => {
  return (
    <Container {
      ...
      { 
        width, 
        display,
        justify, 
        align, 
        pt, 
        pb, 
        wrap, 
        mt, 
        mb, 
        center,
        p,
        flex,
        mobileProps,
      }} 
      {...props}
      className={classNames}
    >
      { children }
    </Container>
  );
};

export default Box;

const Container = styled.div`
  display: ${ props => props.display ? props.display : 'block'};
  flex-direction: ${ props => props.fd ? props.fd : 'unset'};
  max-width: 1200px;
  width: ${(props) => {
    if (props.width === "half") return "50%";
    if (props.width === "al-fu") return "90%"; //almost-full which I treat as 90% with margin 0 auto
    return "100%";
  }};
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  align-items: ${(props) => (props.align ? props.align : "flex-start")};
  padding-top: ${(props) => props.pt + "px"};
  padding-bottom: ${(props) => props.pb + "px"};
  padding: ${(props) => props.p ? props.p : null};
  flex-wrap: ${(props) => (!!props.wrap ? "wrap" : "nowrap")};
  margin: ${(props) => (props.center ? "0 auto" : 0)};
  margin-top: ${(props) => (props.mt ? props.mt + "px" : null)};

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    flex-direction: column; 
    padding: 20px;
  }
`;
