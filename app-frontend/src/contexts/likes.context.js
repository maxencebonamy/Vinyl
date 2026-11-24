import { createContext, useEffect, useState } from "react"
import { getAllItems } from "services/items.service"

export const LikesContext = createContext()

export const LikesProvider = ({ children }) => {
	const [ likes, setLikes ] = useState([])

	const setAndSaveLikes = value => {
		setLikes(value)
		localStorage.setItem("likes", JSON.stringify(value))
	}

	const isItemLiked = id => likes.includes(id)

	const toggleLike = id => {
		if (isItemLiked(id)) {
			setAndSaveLikes(likes.filter(i => i !== id))
		} else {
			setAndSaveLikes([ ...likes, id ])
		}
	}

	const getAllLikes = async () => {
		const allItems = await getAllItems()
		if (!allItems) return []
		return allItems.filter(i => likes.includes(i.id))
	}

	useEffect(() => {
		const localCart = localStorage.getItem("likes")
		if (localCart) {
			setLikes(JSON.parse(localCart))
		}
	}, [])

	return (
		<LikesContext.Provider value={{ isItemLiked, toggleLike, getAllLikes }}>
			{ children }
		</LikesContext.Provider>
	)
}
