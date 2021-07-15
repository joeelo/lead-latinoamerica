import formFields from '@/data/formFields';
import Form from '@/components/form/Form';
import styled from 'styled-components';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';

const AddAndEditOrgs = () => {
  return (
    <CenterFlexContainer>
      <Form formData={ formFields } objKey={ 'addProgram' } />
    </CenterFlexContainer>
  )
}

export default AddAndEditOrgs;

const Container = styled.div`

`