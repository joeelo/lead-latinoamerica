import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const useGetRouterPath = () => {
  const [routePath, setRoutePath] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!router) return

    const path = router.asPath
    setRoutePath(path)
  }, [router])

  return routePath
}

export default useGetRouterPath
