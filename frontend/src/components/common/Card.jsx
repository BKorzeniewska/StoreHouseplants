import './card.css'

export function Card(props) {
    const product = props.product
    console.log(product)
    return (
        <div className="card">
            <div className="cardProperty">Name: {product.name}</div>
            <div className="cardProperty">Description: {product.description}</div>
            <div className="cardProperty">Price: {product.price}$</div>
        </div>
    )
}
