import { Input } from "components/atoms/input"
import { Button } from "components/molecules/button"
import { FormField } from "components/organisms/form-field"
import { LanguageContext } from "contexts"
import { useContext, useState } from "react"
import { createItem } from "services/items.service"

export const AddItemForm = () => {
	const { getText } = useContext(LanguageContext)

	const defaultValues = {
		album: "",
		artist: "",
		cover: "",
		genre: "",
		price: 0,
		salePrice: undefined,
		rating: 0
	}

	const [ status, setStatus ] = useState("idle")
	const [ newItem, setNewItem ] = useState(defaultValues)
	const [ errors, setErrors ] = useState({})

	const handleInputChange = e => {
		const { name, value } = e.target
		setNewItem(prevItem => ({
			...prevItem, [name]: value
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()

		const newErrors = {}

		if (newItem.album.length === 0) newErrors.album = getText("form.required")
		if (newItem.artist.length === 0) newErrors.artist = getText("form.required")
		if (newItem.genre.length === 0) newErrors.genre = getText("form.required")
		if (newItem.cover.length === 0) newErrors.cover = getText("form.required")
		if (newItem.price < 0) newErrors.price = getText("form.min").replace("{min}", 0)
		if (newItem.salePrice !== undefined && (newItem.salePrice < 0 || newItem.salePrice > newItem.price)) {
			newErrors.salePrice = getText("form.between").replace("{min}", 0).replace("{max}", newItem.price)
		}
		if (newItem.rating < 0 || newItem.rating > 5) newErrors.rating = getText("form.between").replace("{min}", 0).replace("{max}", 5)

		setErrors(newErrors)
		if (Object.keys(newErrors).length > 0) return

		createItem(newItem)
			.then(() => setStatus("success"))
			.then(() => setNewItem(defaultValues))
	}

	return (
		<form className="space-y-8">
			<div className="grid grid-cols-2 gap-x-8 gap-y-4">
				<FormField label={getText("item.album")} error={errors.album}>
					<Input type="text" name="album" value={newItem.album} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("item.artist")} error={errors.artist}>
					<Input type="text" name="artist" value={newItem.artist} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("item.genre")} error={errors.genre}>
					<Input type="text" name="genre" value={newItem.genre} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("item.cover")} error={errors.cover}>
					<Input type="text" name="cover" value={newItem.cover} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("item.price")} error={errors.price}>
					<Input type="number" name="price" value={newItem.price} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("item.sale-price")} error={errors.salePrice}>
					<Input type="number" name="salePrice" value={newItem.salePrice} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("item.rating")} error={errors.rating}>
					<Input type="number" step="0.1" name="rating" value={newItem.rating} onChange={handleInputChange} />
				</FormField>
			</div>

			<Button type="submit" variant="secondary" onClick={handleSubmit}>
				{ getText("add-item.action") }
			</Button>

			{ status === "success" && (
				<p className="text-sm text-green-500">
					{ getText("add-item.added") }
				</p>
			) }
		</form>
	)
}
