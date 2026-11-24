import { cn } from "utils/tailwind"

export const Button = ({ children, className, variant = "primary", disabled, ...props }) => {
	const tailwind = cn(
		{ "bg-orange hover:bg-orange/80 drop-shadow-lg text-white": variant === "primary" },
		{ "bg-blue-500 hover:bg-blue-500/80 drop-shadow-lg text-white": variant === "secondary" },
		{ "bg-transparent hover:bg-gray-300 -outline-offset-1 outline outline-1 outline-gray-600": variant === "outline" },
		"transition-all px-4 py-2 rounded-md w-fit text-sm",
		{ "bg-red-400 hover:bg-red-400": disabled && variant === "primary" },
		{ "bg-gray-400 hover:bg-gray-400": disabled && variant === "secondary" },
		{ "outline-gray-300 hover:bg-transparent": disabled && variant === "outline" },
		className
	)

	return (
		<button className={tailwind} disabled={disabled} {...props}>
			{ children }
		</button>
	)
}
