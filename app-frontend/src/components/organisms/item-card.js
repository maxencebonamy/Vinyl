import { GenreBadge } from "components/atoms/genre-badge"
import { RoundedIconButton } from "components/molecules/rounded-icon-button"
import { CartContext, LikesContext } from "contexts"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useContext } from "react"
import Tilt from "react-parallax-tilt"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/price"
import { cn } from "utils/tailwind"

export const ItemCard = ({ item }) => {
	const { addToCart, isItemInCart } = useContext(CartContext)
	const { isItemLiked, toggleLike } = useContext(LikesContext)

	const handleAddToCart = () => {
		addToCart(item)
	}

	return (
		<div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 relative group">
			<Tilt glareEnable>
				<img className="w-full h-auto object-contain aspect-square rounded-md" src={item.cover} alt={`${item.album} cover`} />
			</Tilt>
			<div className="transition-all absolute top-2 right-2 flex flex-col gap-2">
				<RoundedIconButton
					className={cn({ "opacity-0 group-hover:opacity-100": !isItemLiked(item.id) })}
					variant="primary" enabled={isItemLiked(item.id)} icon={Heart} onClick={() => toggleLike(item.id)}
				/>
				<RoundedIconButton
					className="opacity-0 group-hover:opacity-100"
					variant="secondary" enabled={isItemInCart(item.id)} icon={ShoppingCart} onClick={handleAddToCart}
				/>
			</div>
			<div className="flex flex-col flex-1">
				<Link
					to={`/articles/${item.id}`} className="text-md font-semibold line-clamp-1 hover:underline"
				>
					{ item.album }
				</Link>
				<div className="mb-2 flex items-center gap-2">
					<span className="text-sm text-gray-500">{ item.artist }</span>
					<GenreBadge genre={item.genre} />
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex gap-2 items-end">
					<span className="text-md font-semibold">{ formatPrice(item.salePrice ?? item.price) }</span>
					{ item.salePrice && (
						<span className="text-sm font-light mb-[1px] text-gray-500 font-semibold line-through">
							{ formatPrice(item.price) }
						</span>
					) }
				</div>
				<span className="text-md font-semibold flex items-center gap-1">
					<Star className="fill-yellow-400 text-transparent size-4" />
					{ item.rating }
				</span>
			</div>
		</div>
	)
}
