import { ItemCard } from "components/organisms/item-card"
import { LanguageContext, LikesContext } from "contexts"
import { useContext, useEffect, useState } from "react"

export const LikesList = () => {
	const { getAllLikes } = useContext(LikesContext)
	const { getText } = useContext(LanguageContext)

	const [ items, setItems ] = useState(undefined)

	useEffect(() => {
		getAllLikes().then(data => setItems(data))
	}, [ getAllLikes ])

	useEffect(() => {
		console.log(items)
	}, [ items ])

	if (!items) return (
		<p className="text-sm">{ getText("loading") }</p>
	)

	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{
					items.length === 0 && (
						<p className="text-sm">
							{ getText("likes.empty") }
						</p>
					)
				}

				{
					items.map(item => (
						<ItemCard key={item.id} item={item} />
					))
				}
			</div>
		</div>
	)
}
