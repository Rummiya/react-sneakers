import "./cart-item.scss";
import cross from "./../../assets/cart/cross.svg";

const CartItem = ({ apiId, id, img, title, gender, price, removeItem}) => {

    const delCard = () => {
        removeItem({apiId, id})
    }

    return (  
        <div className="cart-item">
            <div className="cart-item__left">
                <img width={100} height={100} src={img} alt="img"/>
                <div className="cart-item__desc">
                    <span className="cart-item__gender">{gender}</span>
                    <p className="cart-item__title">{title}</p>
                </div>
            </div>
            <div className="cart-item__price">
                <span className="price">Цена:</span>
                <b>{price} руб.</b>
            </div>
            <button className="cart-item__btn" onClick={delCard}>
                <img width={12} src={cross} alt="cross"/>
            </button>
        </div>
    );
}
 
export default CartItem;