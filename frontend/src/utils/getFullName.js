export default function getFullName(sessionInfo) {
  if (sessionInfo) {
    if (!sessionInfo.user) return {}

    const name = sessionInfo.user.name.split(' '); 

    const initials = name[0] && name[1] 
      ? `${name[0][0]}${name[1][0]}` 
      : `${sessionInfo.user.name.split('')[0]}`

    return { 
      fullName: sessionInfo.user.name, 
      firstName: name[0], 
      lastName: name[1], 
      initials
    }
  }

  return {}; 
}