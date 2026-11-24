import { cn } from "utils/tailwind"

export const GenreBadge = ({ genre, className, ...props }) => {
	const tailwind = cn(
		"rounded-full px-2 py-0 text-xs flex items-center justify-center bg-gray-500 text-white",
		{ "bg-red-500 text-white": genre === "Rap" },
		{ "bg-blue-500 text-white": genre === "Electronic" },
		{ "bg-green-500 text-white": genre === "Pop" },
		{ "bg-yellow-500 text-white": genre === "Hip-Hop" },
		{ "bg-purple-500 text-white": genre === "Alternative" },
		className
	)

	return (
		<span className={tailwind} {...props}>
			{ genre }
		</span>
	)
}
