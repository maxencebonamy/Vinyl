import { useState } from "react"
import { editItemById } from "services/items.service"

export const ItemForm = ({ item, cancelEditing, setItem }) => {
	const [ updatedItem, setUpdatedItem ] = useState({
		album: item.album,
		artist: item.artist
	})

	const handleInputChange = e => {
		const { name, value } = e.target
		setUpdatedItem(prevItem => ({
			...prevItem, [name]: value
		}))
	}

	const handleUpdateItem = () => {
		editItemById(item.id, updatedItem)
			.then(response => setItem(response))
			.then(cancelEditing)
	}

	return (
		<div className="flex flex-col">
			<label>Album :</label>
			<input
				type="text" name="album"
				value={updatedItem.album} onChange={handleInputChange}
			/>

			<label>Artiste :</label>
			<input
				type="text" name="artist"
				value={updatedItem.artist} onChange={handleInputChange}
			/>
			{ /* Ajoutez d'autres champs pour les autres propriétés */ }
			<button onClick={handleUpdateItem}>Enregistrer</button>
			<button onClick={cancelEditing}>Annuler</button>
		</div>
	)
}
