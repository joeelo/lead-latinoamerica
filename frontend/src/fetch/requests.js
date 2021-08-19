const getProgramBySlug = async (endpoint) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/${endpoint}`); 
		const json = await response.json(); 
		return json;
	} catch (error) {
		console.log(error);
		return { message: error };
	}
}

const postToDatabase = async (data, endpoint, query) => {
	if (query.local) {
		return { message: 'success' };
	}
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

const findProgramAndUpdate = async (data, endpoint) => {
	try {
		const options = {
			method: 'PATCH', 
			headers: {
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(data)
		}
		const request = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/${endpoint}`, options);
		const json = request.json(); 
		console.log(json);
		return json; 
	} catch (error) {
		console.log('ERROR IN FINDPROGRAMANDUPDATE: ', error);
	}
}

export {
	getProgramBySlug, 
	postToDatabase, 
	findProgramAndUpdate,
}