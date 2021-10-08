import styled from 'styled-components';

const VideoBackground = ({ children, src }) => {
    return (
        <Container>
            <Video playsInline autoPlay muted loop src={ src }>
            </Video>    
                { children }
        </Container>
    )
}

export default VideoBackground;

const Container = styled.div`
    min-height: 800px; 
    min-width: 100vw; 
    position: relative; 
    overflow: hidden;

    @media screen and (max-width: 1400px) {
        min-height: 650px;
    }
`

const Video = styled.video`
    position: absolute;
    height: 100%;
    width: 177.77777778vh; /* 100 * 16 / 9 */
    min-width: 100%;
    min-height: 56.25vw; /* 100 * 9 / 16 */
    left: 50%; /* % of surrounding element */
    top: 50%;
    transform: translate(-50%, -50%); /* % of current element */
`