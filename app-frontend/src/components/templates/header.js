import { Badge } from "components/atoms/badge"
import { HeaderLink } from "components/molecules/header-link"
import { IconButton } from "components/molecules/icon-button"
import { LanguageContext } from "contexts"
import { CartContext } from "contexts/cart.context"
import { ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { cn } from "utils/tailwind"

export const Header = () => {
	const tailwind = cn(
		"flex items-center justify-between w-full h-20 fixed px-16",
		"bg-white z-10 border-b border-gray-200 shadow-md"
	)

	const { getText } = useContext(LanguageContext)
	const { quantity } = useContext(CartContext)

	return (
		<div className="h-20">
			<header className={tailwind}>
				<Link to="/" className="flex items-center gap-2">
					<img src="/logo.png" alt="Logo" className="size-6" />
					<p className="text-xl font-bold italic">VINYL</p>
				</Link>

				<div className="flex items-center gap-12">
					<HeaderLink to="/">
						{ getText("home.link") }
					</HeaderLink>
					<HeaderLink to="/settings">
						{ getText("settings.link") }
					</HeaderLink>
					<HeaderLink to="/likes">
						{ getText("likes.link") }
					</HeaderLink>
					<Link to="/cart">
						<IconButton icon={ShoppingCart}>
							{ quantity > 0 && <Badge>{ quantity }</Badge> }
						</IconButton>
					</Link>
				</div>
			</header>
		</div>
	)
}
