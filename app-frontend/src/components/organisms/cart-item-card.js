import { GenreBadge } from "components/atoms/genre-badge"
import { Button } from "components/molecules/button"
import { CartContext } from "contexts"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/price"

export const CartItemCard = ({ item, disabled = false }) => {
	const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)

	return (
		<div className="flex items-center justify-between pb-4 border-b border-gray-300">
			<div className="flex items-stretch gap-4">
				<img className="size-24 object-cover rounded-md" src={item.cover} alt={`${item.album} cover`} />
				<div className="flex flex-col justify-between">
					<div>
						<Link to={`/articles/${item.id}`} className="text-md font-semibold line-clamp-1 hover:underline">
							{ item.album }
						</Link>
						<div className="mb-2 flex items-center gap-2">
							<span className="text-sm text-gray-500">{ item.artist }</span>
							<GenreBadge genre={item.genre} />
						</div>
					</div>
					<div className="flex gap-2 items-end">
						<span className="text-md font-semibold">{ formatPrice(item.salePrice ?? item.price) }</span>
						{ item.salePrice && (
							<span className="text-sm font-light mb-[1px] text-gray-500 font-semibold line-through">
								{ formatPrice(item.price) }
							</span>
						) }
					</div>
				</div>
			</div>

			{ !disabled && (
				<div className="flex items-center gap-4">
					<span>
						{ formatPrice(item.total) }
					</span>
					<Button onClick={() => decreaseQuantity(item.id)} className="p-3" variant="outline" disabled={item.quantity === 1}>
						<Minus className="size-3.5" />
					</Button>
					<span className="min-w-5 text-center">{ item.quantity }</span>
					<Button onClick={() => increaseQuantity(item.id)} className="p-3" variant="outline">
						<Plus className="size-3.5" />
					</Button>
					<Button onClick={() => removeFromCart(item.id)} className="p-3">
						<Trash2 className="size-3.5" />
					</Button>
				</div>
			) }

			{ disabled && (
				<div className="space-x-8">
					<span className="text-gray-500">
						{ item.quantity }x { formatPrice(item.salePrice ?? item.price) }
					</span>
					<span className="">
						{ formatPrice(item.total) }
					</span>
				</div>
			) }
		</div>
	)
}
