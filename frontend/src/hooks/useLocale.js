import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router';

const useLocale = () => {
	const [ lang, setLang ] = useState('en');
	const router = useRouter(); 
	const { locale } = router; 

	useEffect(() => {
		if (locale === 'en') {
			setLang('en');
		} else {
			setLang('es');
		}
	}, [ router.locale ])

	return lang; 
}

export default useLocale; 