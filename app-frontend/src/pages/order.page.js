import { Title } from "components/atoms/title"
import { OrderForm } from "components/templates/order-form"
import { LanguageContext } from "contexts"
import { useContext } from "react"

export const OrderPage = () => {
	const { getText } = useContext(LanguageContext)

	return (
		<div>
			<Title>
				{ getText("order.title") }
			</Title>

			<OrderForm />
		</div>
	)
}
