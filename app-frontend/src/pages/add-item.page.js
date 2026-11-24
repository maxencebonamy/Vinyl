import { Title } from "components/atoms/title"
import { AddItemForm } from "components/templates/add-item-form"
import { LanguageContext } from "contexts"
import { useContext } from "react"

export const AddItemPage = () => {
	const { getText } = useContext(LanguageContext)

	return (
		<div>
			<Title>
				{ getText("add-item.title") }
			</Title>

			<AddItemForm />
		</div>
	)
}
