const UpdateUsersSavedPrograms = async (email, programId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/user/programs/${email}/${programId}`);
    const json = await response.json(); 
    console.log('json:::', json); 
    return json; 
  } catch (error) {
    console.log('error')
  }
}

export {
  UpdateUsersSavedPrograms
}