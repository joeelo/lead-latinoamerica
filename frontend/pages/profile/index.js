import React from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import styled from 'styled-components';
import Image from 'next/image'; 
import Box from '@/components/generic/Box';
import getFullName from '@/utils/getFullName';
import SelectInput from '@/components/form/select/SelectInput';
import { useForm } from 'react-hook-form';
import CheckboxContainer from '@/components/form/CheckboxContainer';
import CheckboxGroup from '@/components/form/checkbox/CheckboxGroup';


const ProfilePage = props => {

  const [ session, loading ] = useSession(); 

  const userName = getFullName(session); 
  
  const { register, handleSubmit, setValue } = useForm(); 
  
  const onSubmit = (data) => {
    console.log('DATA: ', data); 
  }

  return (
    <>
      <NavBar/>
        <PhotoContainer>
          <Image src='/images/profile-images/david-marcu-unsplash-nature.jpg'
            layout='fill'
            objectFit='cover'
          />
        </PhotoContainer>
        <Box width='al-fu' center style={{position: 'relative'}}>
          <NameCircle>
            { userName.initials }
          </NameCircle>
        </Box>
        <Box mw='100vw'>
          <Box width='al-fu' center mt={100} mb={100}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TitleHeading>What year of school are you in</TitleHeading>
              <SelectInput 
                options={[
                  {value: 'freshman', label: 'Freshman'},
                  {value: 'sophomore', label: 'Sophomore'},
                  {value: 'junior', label: 'Junior'},
                  {value: 'senior', label: 'Senior'},
                  {value: 'parent', label: 'I\'m a parent'},
                ]}
                setValue={setValue}
                register={register}
                name='grade'
              />
              <TitleHeading>What programs are you most interested in?</TitleHeading>
              <CheckboxGroup 
                options={[
                  {value: 'summer', label: 'Summer'}, 
                  {value: 'scholarships', label: 'Scholarships'}, 
                  {value: 'internships', label: 'Internships'}, 
                  {value: 'programs', label: 'Programs'}
                ]}
                register={register}
              /> 
            </form>
          </Box>
        </Box>
      <Footer />
    </>
  )
}

ProfilePage.propTypes = {

}

export default ProfilePage; 

const PhotoContainer = styled.div`
  min-height: 400px; 
  min-width: 100vw; 
  position: relative; 
`

const NameCircle = styled.div`
  position: absolute; 
  width: 150px; 
  height: 150px; 
  border-radius: 50%; 
  border: 1px solid #888; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  top: -75px; 
  background-color: #1F2041; 
  color: white;
  font-size: 36px;
`

const TitleHeading = styled.p`
  font-size: 34px;
  margin-bottom: 10px;
  font-weight: 300;
  margin-top: 20px;
`