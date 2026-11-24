import { cn } from "utils/tailwind"

export const Select = ({ options, labels = options, placeholder, className, ...props }) => {
	const tailwind = cn(
		"flex h-10",
		"rounded-md outline outline-1 outline-slate-400",
		"bg-white",
		"px-3 py-2",
		"text-sm placeholder:text-muted-foreground",
		"ring-offset-white",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0",
		"disabled:cursor-not-allowed disabled:opacity-50",
		"border-right border-transparent border-r-8",
		className
	)

	return (
		<select className={tailwind} {...props}>
			{ options.map((value, index) => (
				<option key={index} value={value}>{ (index === 0 && placeholder) ? placeholder : labels[index] }</option>
			)) }
		</select>
	)
}
