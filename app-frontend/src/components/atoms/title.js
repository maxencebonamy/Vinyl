import { cn } from "utils/tailwind"

export const Title = ({ className, children, ...props }) => {
	const tailwind = cn(
		"text-3xl font-bold mb-8",
		className
	)

	return (
		<h1 className={tailwind} {...props}>
			{ children }
		</h1>
	)
}
