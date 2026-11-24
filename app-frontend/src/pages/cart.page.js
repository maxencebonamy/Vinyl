import { Title } from "components/atoms/title"
import { Button } from "components/molecules/button"
import { Cart } from "components/templates/cart-section"
import { CartContext, LanguageContext } from "contexts"
import { useContext } from "react"
import { Link } from "react-router-dom"

export const CartPage = () => {
	const { getText } = useContext(LanguageContext)
	const { quantity } = useContext(CartContext)

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<Title className="mb-0">
					{ getText("cart.title") }
				</Title>
				{ quantity > 0 && (
					<Link to="/order">
						<Button variant="secondary">
							{ getText("cart.action") }
						</Button>
					</Link>
				) }
			</div>

			<Cart />
		</div>
	)
}
