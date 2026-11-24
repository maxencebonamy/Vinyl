export const FormField = ({ label, error, children }) => {
	return (
		<div className="flex flex-col gap-2">
			<label className="text-sm">{ label }</label>
			{ children }
			{ error && <label className="text-sm text-red-500">{ error }</label> }
		</div>
	)
}
