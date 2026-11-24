import { Title } from "components/atoms/title"
import { Button } from "components/molecules/button"
import { ConfirmSection } from "components/templates/confirm-section"
import { CartContext, LanguageContext } from "contexts"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const ConfirmPage = () => {
	const { getText } = useContext(LanguageContext)
	const { emptyCart } = useContext(CartContext)

	const handleConfirm = () => {
		setStatus("success")
		emptyCart()
		localStorage.removeItem("order")
	}

	const [ orderId, setOrderId ] = useState(Math.random().toString().substring(2, 6))
	useEffect(() => {
		const storedOrder = JSON.parse(localStorage.getItem("order"))
		storedOrder && setOrderId(storedOrder.id)
	}, [])

	const [ status, setStatus ] = useState("idle")

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<Title className="mb-0">
					{ getText("confirm.title") } #{ orderId }
				</Title>

				{ status === "idle" && (
					<div className="space-x-4">
						<Link to="/order">
							<Button variant="outline">
								{ getText("confirm.back") }
							</Button>
						</Link>
						<Button variant="secondary" onClick={handleConfirm}>
							{ getText("confirm.action") }
						</Button>
					</div>
				) }
			</div>

			{ status === "idle" && <ConfirmSection /> }

			{ status === "success" && (
				<div className="flex flex-col gap-2">
					<p className="text-green-500">
						{ getText("confirm.success") }
					</p>

					<Link to="/">
						<Button variant="outline">
							{ getText("confirm.home") }
						</Button>
					</Link>
				</div>
			) }
		</div>
	)
}
