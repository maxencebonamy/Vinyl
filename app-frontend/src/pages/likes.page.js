import { Title } from "components/atoms/title"
import { LikesList } from "components/templates/likes-list"
import { LanguageContext } from "contexts"
import { useContext } from "react"

export const LikesPage = () => {
	const { getText } = useContext(LanguageContext)

	return (
		<div>
			<Title>
				{ getText("likes.title") }
			</Title>

			<LikesList />
		</div>
	)
}
