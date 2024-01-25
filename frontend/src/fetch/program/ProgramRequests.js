const ProgramRequests = {
  getAllPrograms,
  getAllProgramsTest,
  getProgram,
  getPrograms,
}

async function getAllProgramsTest(queryContext) {
  const { queryKey } = queryContext
  if (!queryKey) return
  const [_, email] = queryKey
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/user/${email}/programs`
    )
    const json = await response.json()
    return json.message
  } catch (error) {
    console.log(error)
  }
}

async function getAllPrograms() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/programs`
    )

    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

async function getProgram(queryContext) {
  const { queryKey } = queryContext
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
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
