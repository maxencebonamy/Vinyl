import { cn } from "utils/tailwind"

export const RoundedIconButton = ({ icon: Icon, className, variant, enabled, children, ...props }) => {
	const tailwind = cn(
		{ "bg-red-500 hover:bg-red-600": variant === "primary" },
		{ "bg-blue-500 hover:bg-blue-600": variant === "secondary" },
		{ "bg-white hover:bg-gray-200": !enabled },
		"transition-all p-2 rounded-full drop-shadow-lg",
		className
	)

	const iconTailwind = cn(
		{ "text-red-500 fill-red-500": variant === "primary" },
		{ "text-blue-500 fill-blue-500": variant === "secondary" },
		{ "text-white fill-white": enabled },
		"size-4"
	)

	return (
		<button className={tailwind} {...props}>
			<Icon className={iconTailwind} />
			{ children }
		</button>
	)
}
