import { cn } from "utils/tailwind"

export const Input = ({ className, ...props }) => {
	const tailwind = cn(
		"flex h-10",
		"rounded-md outline outline-1 outline-slate-400",
		"bg-white",
		"px-3 py-2",
		"text-sm placeholder:text-muted-foreground",
		"ring-offset-white",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0",
		"disabled:cursor-not-allowed disabled:opacity-50",
		className
	)

	return (
		<input className={tailwind} {...props} />
	)
}
