import { Title } from "components/atoms/title"
import { Button } from "components/molecules/button"
import { ItemsList } from "components/templates/items-list"
import { LanguageContext } from "contexts"
import { useContext } from "react"
import { Link } from "react-router-dom"

export const HomePage = () => {
	const { getText } = useContext(LanguageContext)

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<Title className="mb-0">
					{ getText("home.title") }
				</Title>
				<Link to="/articles/add">
					<Button variant="secondary">
						{ getText("home.action") }
					</Button>
				</Link>
			</div>

			<ItemsList />
		</div>
	)
}
