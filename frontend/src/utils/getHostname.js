const getHostname = () => {
  if (typeof window !== 'undefined') {
    return window.location.host;
  } 
    
  return ''
}

export default getHostname

// TODO: Add more methods to this for window object. 