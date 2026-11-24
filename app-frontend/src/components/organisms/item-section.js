export const ItemSection = ({ item, enableEditing }) => {
	return (
		<div>
			<h2>Album : { item.album }</h2>
			<p>Artiste : { item.artist }</p>
			<p>Genre : { item.genre }</p>
			<p>Prix : { item.price }€</p>
			{ item.salePrice && <p>Prix en solde : { item.salePrice }€</p> }
			<p>Rating : { item.rating } étoiles</p>
			<p>Description : { item.description }</p>

			<button onClick={enableEditing}>Modifier</button>
		</div>
	)
}
