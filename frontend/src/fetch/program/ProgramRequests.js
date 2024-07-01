const ProgramRequests = {
  getAllPrograms,
  getProgram,
  getPrograms,
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

export default ProgramRequests
