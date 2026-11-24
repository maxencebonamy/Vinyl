import { ItemForm } from "components/organisms/item-form"
import { ItemSection } from "components/organisms/item-section"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getItemById } from "services/items.service"

export const ItemPage = () => {
	const { id } = useParams()

	const [ editing, setEditing ] = useState(false)
	const [ item, setItem ] = useState(undefined)

	useEffect(() => {
		getItemById(id).then(response => setItem(response))
	}, [ id ])

	if (!item) return <div>Loading...</div>

	return (
		<div className="flex flex-col">
			{ editing
				? (
					<ItemForm item={item} cancelEditing={() => setEditing(false)} setItem={setItem} />
				)
				: (
					<ItemSection item={item} enableEditing={() => setEditing(true)} />
				) }
		</div>
	)
}
