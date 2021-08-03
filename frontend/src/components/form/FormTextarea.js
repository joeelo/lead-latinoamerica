import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';

const FormTextarea = ({ data, register, hasErrors, }) => {

    const theme = useContext(ThemeContext);

    return (
        <Container>
            <Label htmlFor={ data.label }> { data.label }</Label>
            <Textarea 
                {...register(
                    data.label, 
                    { required: true }
                )}
                name={ data.label } 
                placeholder={ data.placeHolder }
                theme={ theme }
            >
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
    border: 1px solid ${ props => props.theme.colors.cyan };
    border-radius: 4px; 
`