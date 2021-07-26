import formFields from '@/data/formFields';
import Form from '@/components/form/Form';
import styled from 'styled-components';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';

const AddAndEditOrgs = () => {
  return (
    <>
    <NavBar />
    <CenterFlexContainer backgroundColor={ '#F8FAFA' }>
      <Form formData={ formFields } objKey={ 'addProgram' } />
    </CenterFlexContainer>
    <Footer />
    </>
  )
}

export default AddAndEditOrgs;

const Container = styled.div`

`