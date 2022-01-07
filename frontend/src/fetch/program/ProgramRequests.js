const getAllPrograms = async ({ queryKey }) => {
  if (!queryKey) return; 
  const email = queryKey[1]
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/user/${email}/programs`); 
    const json = await response.json(); 
    return json; 
  } catch (error) {
    console.log('ERROR IN GETALLPROGRAMS: ', error); 
  }
}

const getProgram = async ({ queryKey }) => {
  const [_, endpoint] = queryKey;
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/program/${endpoint}`); 
		const json = await response.json(); 
		return json;
	} catch (error) {
		console.log(error);
		return { message: error };
	}
}

export { getAllPrograms, getProgram }; 