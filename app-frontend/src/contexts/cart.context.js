import { createContext, useEffect, useState } from "react"
import { getAllItems } from "services/items.service"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [ cart, setCart ] = useState([])

	const quantity = cart.reduce((acc, item) => acc + item.quantity, 0)

	const setAndSaveCart = value => {
		setCart(value)
		localStorage.setItem("cart", JSON.stringify(value))
	}

	const addToCart = itemId => {
		if (isItemInCart(itemId.id)) return
		setAndSaveCart([ ...cart, { ...itemId, quantity: 1 } ])
	}

	const removeFromCart = itemId => {
		const newCart = cart.filter(i => i.id !== itemId)
		setAndSaveCart(newCart)
	}

	const increaseQuantity = itemId => {
		const newCart = cart.map(i => {
			if (i.id === itemId) {
				return { ...i, quantity: i.quantity + 1 }
			}
			return i
		})
		setAndSaveCart(newCart)
	}

	const decreaseQuantity = itemId => {
		if (cart.find(i => i.id === itemId).quantity === 1) return
		const newCart = cart.map(i => {
			if (i.id === itemId) {
				return { ...i, quantity: i.quantity - 1 }
			}
			return i
		})
		setAndSaveCart(newCart)
	}

	const emptyCart = () => {
		setAndSaveCart([])
	}

	const isItemInCart = id => cart.some(i => i.id === id)

	const getAllItemsWithTotal = async () => {
		const allItems = await getAllItems()
		if (!allItems) return []
		const cartItems = allItems.filter(i => cart.some(c => c.id === i.id))

		const total = cartItems.reduce((acc, item) => {
			const cartItem = cart.find(c => c.id === item.id)
			return acc + (cartItem.quantity * (item.salePrice ?? item.price))
		}, 0)

		const items = cartItems.map(item => {
			const cartItem = cart.find(c => c.id === item.id)
			return { ...item, quantity: cartItem.quantity, total: cartItem.quantity * (item.salePrice ?? item.price) }
		})

		return { items, total }
	}

	useEffect(() => {
		const localCart = localStorage.getItem("cart")
		if (localCart) {
			setCart(JSON.parse(localCart))
		}
	}, [])

	return (
		<CartContext.Provider
			value={{
				quantity, getAllItemsWithTotal, addToCart, emptyCart, isItemInCart, removeFromCart, increaseQuantity, decreaseQuantity
			}}
		>
			{ children }
		</CartContext.Provider>
	)
}
