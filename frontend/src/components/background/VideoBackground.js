import styled from 'styled-components';

const VideoBackground = ({ children }) => {
    return (
        <Container>
            <Video playsInline autoPlay muted loop src='/pexels-pavel-danilyuk-7945680.mp4'>
                { children }
            </Video>    
        </Container>
    )
}

export default VideoBackground;

const Container = styled.div`
    min-height: 800px; 
    min-width: 100vw; 
    position: relative; 
    overflow: hidden;
`

const Video = styled.video`
    position: absolute;
    height: %;
    width: 100%;
    // object-fit: cover;
    // top: 20%;
    // transform: translate(-50%, -50%);
    // left: 50%;
`