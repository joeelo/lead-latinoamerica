const getAllPrograms = async (email, ) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/user/${email}/programs`); 
    const json = await response.json(); 
    
    console.log(json); 
    return json; 
  } catch (error) {
    console.log('ERROR IN GETALLPROGRAMS: ', error); 
  }
}

export { getAllPrograms }; 