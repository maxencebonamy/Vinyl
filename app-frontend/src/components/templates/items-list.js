import { Input } from "components/atoms/input"
import { Select } from "components/atoms/select"
import { ItemCard } from "components/organisms/item-card"
import { LanguageContext } from "contexts"
import { useContext, useEffect, useMemo, useState } from "react"
import { getAllItems, getFilteredItems } from "services/items.service"

export const ItemsList = () => {
	const { getText } = useContext(LanguageContext)

	const allSorts = useMemo(() => [
		{ label: "default", sortBy: "default", orderBy: "" },
		{ label: getText("home.sorts")["album-asc"], sortBy: "album", orderBy: "asc" },
		{ label: getText("home.sorts")["album-desc"], sortBy: "album", orderBy: "desc" },
		{ label: getText("home.sorts")["artist-asc"], sortBy: "artist", orderBy: "asc" },
		{ label: getText("home.sorts")["artist-desc"], sortBy: "artist", orderBy: "desc" },
		{ label: getText("home.sorts")["rating-asc"], sortBy: "rating", orderBy: "asc" },
		{ label: getText("home.sorts")["rating-desc"], sortBy: "rating", orderBy: "desc" }
	], [ getText ])

	const [ allGenres, setAllGenres ] = useState([])
	const [ items, setItems ] = useState(undefined)
	const [ search, setSearch ] = useState("")
	const [ genre, setGenre ] = useState("all")
	const [ sort, setSort ] = useState("default")

	useEffect(() => {
		const { sortBy, orderBy } = allSorts.find(s => s.label === sort)
		getFilteredItems(search, genre, sortBy, orderBy).then(data => setItems(data))
	}, [ search, genre, sort, allSorts ])

	useEffect(() => {
		getAllItems().then(data => {
			const genres = data.map(item => item.genre).filter((value, index, self) => self.indexOf(value) === index)
			setAllGenres(genres)
		})
	}, [])

	if (!items) return (
		<p className="text-sm">{ getText("loading") }</p>
	)

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Input
					type="text" value={search} onChange={e => setSearch(e.target.value)}
					placeholder={getText("home.search")} className="flex-1"
				/>
				<Select
					value={genre} onChange={e => setGenre(e.target.value)}
					placeholder={getText("home.filter-placeholder")} options={[ "all", ...allGenres ]}
				/>
				<Select
					value={sort} onChange={e => setSort(e.target.value)}
					placeholder={getText("home.sort-placeholder")} options={allSorts.map(sort => sort.label)}
				/>
			</div>

			{
				items.length === 0 && (
					<p className="text-sm">{ getText("home.no-items") }</p>
				)
			}

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{
					items.map(item => (
						<ItemCard key={item.id} item={item} />
					))
				}
			</div>
		</div>
	)
}
