export {
  findProgramAndUpdate,
}

async function findProgramAndUpdate(data = {}, endpoint) {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}${endpoint}`,
      options
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}
