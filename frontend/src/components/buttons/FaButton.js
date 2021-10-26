import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const FaButton = ({backgroundColor, size, ...props}) => {
    return (
        <Container>
            <FontAwesomeIcon icon={faTrash} {...props} size={size}/>
        </Container>
    )
}

export default FaButton;

const Container = styled.div`

`