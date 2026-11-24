import { CartItemCard } from "components/organisms/cart-item-card"
import { CartContext, LanguageContext } from "contexts"
import { useContext, useEffect, useState } from "react"
import { CODES } from "services/codes.service"
import { formatPrice } from "utils/price"

export const ConfirmSection = () => {
	const { getAllItemsWithTotal } = useContext(CartContext)
	const { getText } = useContext(LanguageContext)

	const [ cart, setCart ] = useState(undefined)
	const [ orderInfo, setOrderInfo ] = useState(undefined)

	useEffect(() => {
		getAllItemsWithTotal().then(data => setCart(data))
	}, [ getAllItemsWithTotal ])

	useEffect(() => {
		const storedOrder = JSON.parse(localStorage.getItem("order"))
		storedOrder && setOrderInfo(prev => ({ ...prev, ...storedOrder }))
	}, [])

	if (!cart) return (
		<p className="text-sm">{ getText("loading") }</p>
	)

	return (
		<div>
			<div className="flex flex-col gap-4">
				{
					cart.items.map((item, index) => (
						<CartItemCard key={index} item={item} disabled />
					))
				}

				<div className="flex items-center justify-end gap-4">
					<span className="font-semibold">Total: { formatPrice(cart.total) }</span>
				</div>

				{ orderInfo.code && (
					<>
						<div className="flex items-center justify-end gap-4">
							<span className="font-light">
								{ getText("confirm.code") } { orderInfo.code } : -{ Math.round((1 - CODES[orderInfo.code]) * 100) }%
							</span>
						</div>

						<div className="flex items-center justify-end gap-4">
							<span className="font-semibold">
								{ getText("confirm.total-code") }: { formatPrice(cart.total * CODES[orderInfo.code]) }
							</span>
						</div>
					</>
				) }

				{ orderInfo && (
					<div className="border border-gray-300 p-4 rounded-md mt-8">
						<div className="grid grid-cols-2 gap-x-8 gap-y-4">
							<div>
								<p className="font-semibold">{ getText("order-info.email") }</p>
								<p>{ orderInfo.email }</p>
							</div>
							<div>
								<p className="font-semibold">{ getText("order-info.phone") }</p>
								<p>{ orderInfo.phone }</p>
							</div>
							<div>
								<p className="font-semibold">{ getText("order-info.address") }</p>
								<p>{ orderInfo.address }</p>
							</div>
							<div>
								<p className="font-semibold">{ getText("order-info.zip") }</p>
								<p>{ orderInfo.zip }</p>
							</div>
							<div>
								<p className="font-semibold">{ getText("order-info.city") }</p>
								<p>{ orderInfo.city }</p>
							</div>
							<div>
								<p className="font-semibold">{ getText("order-info.country") }</p>
								<p>{ orderInfo.country }</p>
							</div>
							<div>
								<p className="font-semibold">{ getText("order-info.payment") }</p>
								<p>{ getText("order-info.payment-options")[orderInfo.payment] }</p>
							</div>
						</div>
					</div>
				) }
			</div>
		</div>
	)
}
