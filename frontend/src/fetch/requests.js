export {
	getProgramBySlug, 
	getProgramArray, 
	postToDatabase, 
	findProgramAndUpdate,
}

async function getProgramBySlug(endpoint) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/${endpoint}`); 
		const json = await response.json(); 
		return json;
	} catch (error) {
		console.log(error);
		return { message: error };
	}
}

async function getProgramArray(endpoint, programType) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/${endpoint}?programType=${programType}`); 
		const json = await response.json(); 
		return json;
	} catch (error) {
		console.log(error);
		return { message: error };
	}
}

async function postToDatabase(data, endpoint, query = {}) {
	if (query.local) {
		return { message: 'success' };
	}
	data.query = query; 
	try {
		const options = {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(data), 
		}
		const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/${endpoint}`, options);
		const json = await response.json(); 
		return json; 
	} catch (error) {
		return { message: error };
	}
}

async function findProgramAndUpdate(data = {}, endpoint) {
	try {
		const options = {
			method: 'PUT', 
			headers: {
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(data)
		}
		const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}${endpoint}`, options);
		const json = await response.json();
		return json; 
	} catch (error) {
		console.log(error);
	}
}