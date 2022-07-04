import "./Product.scss";
import Button from "../Button/Button";

const Products = ({products}) => {
    const {name,price,imageUrl} = products;
    return ( 
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
            <Button buttonType='inverted'>Add to Card</Button>
        </div>
     );
}
 
export default Products;