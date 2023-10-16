import {Link} from "react-router-dom";

const ProductCard = ({product}) => {
    const imgURL = `https://picsum.photos/id/${product.id * 10}/1920/1080`;
    return (
        <div className="card">
            <img src={imgURL} alt={product.name} className="card-img-top" />
            <div className="card-body">
                <h5>{product.name}</h5>
                <p>$ {product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-sm btn-info">
                    Show details
                </Link>
            </div>
        </div>
    )
}

export default ProductCard;