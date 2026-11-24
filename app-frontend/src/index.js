import { AddItemPage, CartPage, ConfirmPage, ErrorPage, HomePage, ItemPage, Layout, LikesPage, OrderPage, SettingsPage } from "pages"
import React from "react"
import ReactDOM from "react-dom/client"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import "./index.css"
import { Providers } from "./providers"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
	<React.StrictMode>
		<Providers>
			<Router>
				<Layout>
					<Switch>
						<Route path="/" exact>
							<HomePage />
						</Route>
						<Route path="/articles/add">
							<AddItemPage />
						</Route>
						<Route path="/articles/:id">
							<ItemPage />
						</Route>
						<Route path="/settings">
							<SettingsPage />
						</Route>
						<Route path="/likes">
							<LikesPage />
						</Route>
						<Route path="/cart">
							<CartPage />
						</Route>
						<Route path="/order">
							<OrderPage />
						</Route>
						<Route path="/confirm">
							<ConfirmPage />
						</Route>
						<Route path="*">
							<ErrorPage />
						</Route>
					</Switch>
				</Layout>
			</Router>
		</Providers>
	</React.StrictMode>
)
