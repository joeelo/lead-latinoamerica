const createProfile = async (session) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/profile/create`, {
      method: 'POST', 
      headers: {
				'Content-Type': 'application/json'
			}, 
      body: JSON.stringify(session)
    });
    const json = await response.json(); 
  
    return json; 
  } catch (error) {
    console.log('error: ', error)
  }
}

const getProfile = async (session) => {
  // if there is no profile we will create one with creds given. 
  const { email } = session.user; 
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/profile/${email}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(session)  
    });
    const json = await response.json(); 

    if (json.success && !json.hasProfile) {
      const json = await createProfile(session); 
      return json; 
    }

    console.log(json); 
    return json; 
  } catch (error) {
    console.log('error', error); 
  }
}

export {
  createProfile, 
  getProfile,
}