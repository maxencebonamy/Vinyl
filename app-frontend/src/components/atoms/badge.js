import { cn } from "utils/tailwind"

export const Badge = ({ children, className, ...props }) => {
	const tailwind = cn(
		"rounded-full drop-shadow-md size-5 text-xs text-black bg-white flex items-center justify-center",
		"absolute -top-1 -right-1",
		className
	)

	return (
		<span className={tailwind} {...props}>
			{ children }
		</span>
	)
}
