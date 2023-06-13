export default function getFullName(sessionInfo) {
  if (sessionInfo) {
    if (!sessionInfo.user) return {}

    const name = sessionInfo.user.name.split(' ')

    if (name.length < 2) return sessionInfo.user.name

    return {
      fullName: sessionInfo.user.name,
      firstName: name[0],
      lastName: name[1],
      initials: `${name[0][0]}${name[1][0]}`,
    }
  }

  return {}
}
