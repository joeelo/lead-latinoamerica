const getFromDatabase = async (data, endpoint) => {
  try {
    const response = await fetch(`${process.env.DB_LOCATION}/${endpoint}`); 
    return response;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
}

const postToDatabase = async (data, endpoint) => {
  try {
    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/${endpoint}`, options);
    const json = await response.json(); 
    console.log('RESPONSE JSON FROM POSTTODATABASE: ', json);
    return json; 
  } catch (error) {
    console.log(error);
    return { message: error };
  }
}

export {
  getFromDatabase, 
  postToDatabase
}