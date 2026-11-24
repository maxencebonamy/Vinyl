import { Title } from "components/atoms/title"
import { Button } from "components/molecules/button"
import { LanguageContext, ThemeContext } from "contexts"
import { useContext } from "react"

export const SettingsPage = () => {
	const { toggleLanguage, getText } = useContext(LanguageContext)
	const { toggleTheme } = useContext(ThemeContext)

	return (
		<div>
			<Title>
				{ getText("settings.title") }
			</Title>

			<div className="flex gap-4">
				<Button onClick={toggleLanguage} variant="outline">
					{ getText("settings.toggle-language") }
				</Button>

				<Button onClick={toggleTheme} variant="outline">
					{ getText("settings.toggle-theme") }
				</Button>
			</div>
		</div>
	)
}
