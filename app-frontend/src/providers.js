import { CartProvider, LanguageProvider, LikesProvider, ThemeProvider } from "contexts"

export const Providers = ({ children }) => {
	return (
		<LanguageProvider>
			<ThemeProvider>
				<CartProvider>
					<LikesProvider>
						{ children }
					</LikesProvider>
				</CartProvider>
			</ThemeProvider>
		</LanguageProvider>
	)
}
