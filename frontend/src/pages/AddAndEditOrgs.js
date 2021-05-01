import formFields from '@/data/formFields';
import Form from '@/components/form/Form';

const AddAndEditOrgs = () => {
  return (
    <>
      <Form formData={ formFields } objKey={ 'addProgram' } />
    </>
  )
}

export default AddAndEditOrgs;