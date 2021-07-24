import styled from 'styled-components';

const FormTextarea = ({ data, register, hasErrors, }) => {
    return (
        <Container>
            <Label for={ data.label }> { data.label }</Label>
            <Textarea name={ data.label } placeholder={ data.placeHolder }>
            </Textarea>
        </Container>
    )
}

export default FormTextarea;

const Container = styled.div`
    margin-top: 20px; 
    display: flex; 
    flex-direction: column;
`

const Label = styled.label`
    font-size: 24px; 
    color: darkblue; 
    padding-left: 5px;
    text-transform: capitalize;
    margin-bottom: 10px; 
`

const Textarea = styled.textarea`
    width: 100%; 
    height: 200px;
    resize: none;
    padding: 10px;
`