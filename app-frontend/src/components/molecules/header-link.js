import { Link, useLocation } from "react-router-dom"
import { cn } from "utils/tailwind"

export const HeaderLink = ({ to, children, className }) => {
	const match = useLocation().pathname === to

	const tailwind = cn(
		"after:content-[''] after:block after:border-b-2 after:scale-x-0 after:transition-transform",
		"after:border-orange after:hover:scale-75 after:duration-300",
		"text-sm hover:text-orange transition-colors duration-300",
		{ "text-orange": match },
		className
	)

	return (
		<div>
			<Link to={to} className={tailwind}>
				{ children }
			</Link>
		</div>
	)
}
