import { cn } from "utils/tailwind"

export const IconButton = ({ icon: Icon, className, children }) => {
	const tailwind = cn(
		"bg-orange hover:bg-orange/80 transition-all p-3 rounded-xl drop-shadow-lg",
		className
	)

	return (
		<button className={tailwind}>
			<Icon className="size-4 text-white" />
			{ children }
		</button>
	)
}
