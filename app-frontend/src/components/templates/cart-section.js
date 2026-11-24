import { Button } from "components/molecules/button"
import { CartItemCard } from "components/organisms/cart-item-card"
import { CartContext, LanguageContext } from "contexts"
import { useContext, useEffect, useState } from "react"
import { formatPrice } from "utils/price"

export const Cart = () => {
	const { emptyCart, getAllItemsWithTotal } = useContext(CartContext)
	const { getText } = useContext(LanguageContext)

	const [ cart, setCart ] = useState(undefined)

	useEffect(() => {
		getAllItemsWithTotal().then(data => setCart(data))
	}, [ getAllItemsWithTotal ])

	if (!cart) return (
		<p className="text-sm">{ getText("loading") }</p>
	)

	return (
		<div>
			<div className="space-y-4">
				{
					cart.items.length === 0 && (
						<p className="text-sm">
							{ getText("cart.empty") }
						</p>
					)
				}

				{
					cart.items.map((item, index) => (
						<CartItemCard key={index} item={item} />
					))
				}

				{
					cart.items.length > 0 && (
						<div className="flex items-center justify-end gap-4">
							<span className="font-semibold">Total: { formatPrice(cart.total) }</span>
							<Button onClick={emptyCart}>
								{ getText("cart.empty-action") }
							</Button>
						</div>
					)
				}
			</div>
		</div>
	)
}
