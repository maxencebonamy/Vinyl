import { Button } from "components/molecules/button"
import { LanguageContext } from "contexts"
import { useContext } from "react"
import { Link } from "react-router-dom"

export const ErrorPage = () => {
	const { getText } = useContext(LanguageContext)

	return (
		<div className="w-full flex flex-col items-center gap-4">
			<img className="w-1/2 bg-light" src="/error.svg" alt="Error SVG" />
			<span className="text-xl font-semibold">
				{ getText("error.title") }
			</span>
			<Link to="/">
				<Button>
					{ getText("error.action") }
				</Button>
			</Link>
		</div>
	)
}
