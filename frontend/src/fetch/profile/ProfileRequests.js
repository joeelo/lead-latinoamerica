async function createProfile(session) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/profile/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
      }
    )
    const json = await response.json()

    return json
  } catch (error) {
    console.log(error)
  }
}

async function getProfile(session) {
  // if there is no profile we will create one with creds given.
  if (!session.user) return
  const { email } = session.user
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/profile/${email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
      }
    )

    const json = await response.json()

    return json
  } catch (error) {
    console.log(error)
  }
}

async function editProfile(data, email) {
  const body = JSON.stringify({ data })

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_LOCATION}/user/profile/${email}/edit`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }
    )
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export { createProfile, getProfile, editProfile }
