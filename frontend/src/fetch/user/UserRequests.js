const UpdateUsersSavedPrograms = async (email, programId) => {
  const url = `${process.env.NEXT_PUBLIC_DB_LOCATION}/user/programs/${email}/${programId}`; 

  try {
    const response = await fetch();
    const json = await response.json(); 
    return json; 
  } catch (error) {
    console.log('error');
  }
}

const RemoveUserSavedProgram = async () => {

  const url = `process.env.NEXT_PUBLIC_DB_LOCATION}/user/programs/${email}/${programId}`

  const options = {
    method: 'DELETE', 
    headers: {
      'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
  }

  try {
    const response = await fetch(url, options);
    const json = await response.json(); 
    return json;
  } catch (error) {
    console.log('error');
  }
}

export {
  UpdateUsersSavedPrograms
}