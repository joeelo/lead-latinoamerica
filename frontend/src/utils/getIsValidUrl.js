/**
 * 
 * @param { string } url 
 */

export default function getIsValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}