import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useGetRouterPath = () => {
  const [ routePath, setRoutePath ] = useState('');
  const router = useRouter(); 
  if (!router) return;
  useEffect(() => {
    const path = router.asPath; 
    setRoutePath(path);
  }, [])

  return routePath; 
}

export default useGetRouterPath;