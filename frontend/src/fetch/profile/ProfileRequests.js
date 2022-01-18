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
  if (!session.user && !session.queryKey) return; 
  const { email } = !session.queryKey ? session.user : session.queryKey[1].user; 
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/profile/${email}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(session)  
    });
    const json = await response.json(); 
    return json; 
  } catch (error) {
    console.log('error', error); 
  }
}

const editProfile = async (data, email) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/user/profile/${email}/edit`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ data })
    });
    const json = await response.json(); 
    return json; 
  } catch (error) {
    console.log('error in editProfile: ', error);
  }
}

export {
  createProfile, 
  getProfile,
  editProfile, 
}