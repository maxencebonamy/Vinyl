import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
	const [ theme, setTheme ] = useState("light")

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark")
	}

	useEffect(() => {
		document.documentElement.classList.remove("dark")
		theme === "dark" && document.documentElement.classList.add("dark")
	}, [ theme ])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{ children }
		</ThemeContext.Provider>
	)
}
