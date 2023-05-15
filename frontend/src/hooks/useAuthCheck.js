import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const useAuthCheck = () => {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const id = localStorage.getItem('id')
    const name = router.query.name

    if (id === 'password1234' && name === 'mikeE') {
      setIsAuthed(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isAuthed
}

export default useAuthCheck
