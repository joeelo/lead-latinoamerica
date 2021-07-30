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
  console.log('POST TO DATABASE DATA: ', data);
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
    console.log(json);
    console.log('POST TO DATABASE RESPONSE JSON: ', json);
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