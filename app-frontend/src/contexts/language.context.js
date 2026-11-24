import { en, fr } from "i18n"
import { createContext, useState } from "react"

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
	const [ language, setLanguage ] = useState("fr")

	const toggleLanguage = () => {
		setLanguage(language === "fr" ? "en" : "fr")
	}

	const getText = key => {
		if (language === "fr") {
			return fr[key]
		} else {
			return en[key]
		}
	}

	return (
		<LanguageContext.Provider value={{ toggleLanguage, getText }}>
			{ children }
		</LanguageContext.Provider>
	)
}
