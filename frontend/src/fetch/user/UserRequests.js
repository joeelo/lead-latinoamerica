const UpdateUsersSavedPrograms = async (email, programId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/user/programs/${email}/${programId}`)
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error)
  }
}

const RemoveUserSavedProgram = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/user/programs/${email}/${programId}`, {
      method: "DELETE", 
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

export {
  UpdateUsersSavedPrograms
}