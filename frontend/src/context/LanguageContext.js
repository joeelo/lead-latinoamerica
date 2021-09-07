import { createContext, useContext } from "react";

const LanguageContext = createContext(); 

export const LanguageWrapper = ({ children }) => {
	let language = {
		// activeLanguage: 'en',
		// changeLanguage: (lang) => {
		// 	activeLanguage: lang;
		// }
	}

	return (
		<LanguageContext.Provider value={ language }>
			{ children }
		</LanguageContext.Provider>
	)
}

export const useLanguageContext = () => useContext(LanguageContext);