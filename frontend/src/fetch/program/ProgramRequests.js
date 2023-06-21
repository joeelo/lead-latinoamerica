const ProgramRequests =  {
  getAllPrograms,
  getProgram,
  getPrograms,
}

async function getAllPrograms(queryContext) {
  const { queryKey } = queryContext
  if (!queryKey) return
  const email = queryKey[1]
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/user/${email}/programs`
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

async function getProgram(queryContext) {
  const { queryKey } = queryContext
  const [_, data] = queryKey
  const { name } = data
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/program/${name}`
    )
    const json = await response.json()
    return json.program
  } catch (error) {
    console.log(error)
    return { message: error }
  }
}

async function getPrograms(queryContext) {
  const { queryKey } = queryContext
  const [_, data] = queryKey
  const { programType } = data
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/programs/resources?programType=${programType}`
    )
    const json = await response.json()
    return json.message
  } catch (error) {
    console.log(error)
    return { message: error }
  }
}

export default ProgramRequests
