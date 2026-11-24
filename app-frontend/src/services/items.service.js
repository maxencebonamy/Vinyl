export const getAllItems = () => {
	return fetch("http://localhost:3001/items")
		.then(response => response.json())
		.catch(error => console.log(error))
}

export const getFilteredItems = (search, genre, sortBy, orderBy) => {
	return getAllItems().then(items => {
		if (!search) return items
		search = search.trim().toLowerCase()
		return items.filter(item => item.album.toLowerCase().includes(search) || item.artist.toLowerCase().includes(search))
	}).then(items => {
		if (!genre || genre === "all") return items
		return items.filter(item => item.genre === genre)
	}).then(items => {
		if (!sortBy || sortBy === "default") return items
		return items.sort((a, b) => {
			if (a[sortBy] < b[sortBy]) return orderBy === "asc" ? -1 : 1
			if (a[sortBy] > b[sortBy]) return orderBy === "asc" ? 1 : -1
			return 0
		})
	})
}

export const getItemById = id => {
	return fetch(`http://localhost:3001/items/${id}`)
		.then(response => response.json())
		.catch(error => console.log(error))
}

export const createItem = item => {
	return fetch("http://localhost:3001/items", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(item)
	})
		.then(response => response.json())
		.catch(error => console.log(error))
}

export const editItemById = (id, item) => {
	return fetch(`http://localhost:3001/items/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(item)
	})
		.then(response => response.json())
		.catch(error => console.log(error))
}
