import { Header } from "components/templates/header"

export const Layout = ({ children }) => {
	return (
		<div className="bg-light dark:bg-black min-h-screen">
			<Header />
			<div className="mx-24 py-16">
				{ children }
			</div>
		</div>
	)
}
