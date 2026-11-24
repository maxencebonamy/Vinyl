import { Input } from "components/atoms/input"
import { Select } from "components/atoms/select"
import { Button } from "components/molecules/button"
import { FormField } from "components/organisms/form-field"
import { LanguageContext } from "contexts"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { CODES } from "services/codes.service"

export const OrderForm = () => {
	const history = useHistory()
	const { getText } = useContext(LanguageContext)

	const allPayments = [ "credit-card", "paypal", "google-pay", "apple-pay" ]
	const validCodes = Object.keys(CODES)

	const defaultValues = {
		email: "",
		phone: "",
		address: "",
		zip: "",
		city: "",
		country: "",
		payment: allPayments[0],
		code: "",
		id: Math.random().toString().substring(2, 6)
	}

	const [ orderInfo, setOrderInfo ] = useState(defaultValues)
	const [ errors, setErrors ] = useState({})

	const handleInputChange = e => {
		const { name, value } = e.target
		setOrderInfo(prevItem => ({
			...prevItem, [name]: value
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()

		const newErrors = {}

		if (orderInfo.email.length === 0) newErrors.email = getText("form.required")
		if (orderInfo.phone.length === 0) newErrors.phone = getText("form.required")
		if (orderInfo.address.length === 0) newErrors.address = getText("form.required")
		if (orderInfo.zip.length === 0) newErrors.zip = getText("form.required")
		if (orderInfo.city.length === 0) newErrors.city = getText("form.required")
		if (orderInfo.country.length === 0) newErrors.country = getText("form.required")
		if (orderInfo.code.length > 0 && !validCodes.includes(orderInfo.code)) newErrors.code = getText("form.invalid-code")

		setErrors(newErrors)
		if (Object.keys(newErrors).length > 0) return

		localStorage.setItem("order", JSON.stringify(orderInfo))
		history.push("/confirm")
	}

	useEffect(() => {
		const storedOrder = JSON.parse(localStorage.getItem("order"))
		storedOrder && setOrderInfo(prev => ({ ...prev, ...storedOrder }))
	}, [])

	return (
		<form className="space-y-8">
			<div className="grid grid-cols-2 gap-x-8 gap-y-4">
				<FormField label={getText("order-info.email")} error={errors.email}>
					<Input type="email" name="email" value={orderInfo.email} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("order-info.phone")} error={errors.phone}>
					<Input type="tel" name="phone" value={orderInfo.phone} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("order-info.address")} error={errors.address}>
					<Input type="text" name="address" value={orderInfo.address} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("order-info.zip")} error={errors.zip}>
					<Input type="text" name="zip" value={orderInfo.zip} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("order-info.city")} error={errors.city}>
					<Input type="text" name="city" value={orderInfo.city} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("order-info.country")} error={errors.country}>
					<Input type="text" name="country" value={orderInfo.country} onChange={handleInputChange} />
				</FormField>

				<FormField label={getText("order-info.payment")} error={errors.payment}>
					<Select
						options={allPayments} labels={allPayments.map(e => getText("order-info.payment-options")[e])}
						name="payment" value={orderInfo.payment} onChange={handleInputChange}
					/>
				</FormField>

				<FormField label={getText("order-info.code")} error={errors.code}>
					<Input type="text" name="code" value={orderInfo.code} onChange={handleInputChange} />
				</FormField>
			</div>

			<Button type="submit" variant="secondary" onClick={handleSubmit}>
				{ getText("order.action") }
			</Button>
		</form>
	)
}
