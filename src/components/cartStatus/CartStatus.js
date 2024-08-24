import { Link } from "react-router-dom";
import "./cartStatus.scss"

const CartStatus = ({ img, title, description }) => {

    return (  
        <div className="cart-empty">
            <img className="cart-empty__box" width={100} src={img} alt="empty"/>
            <h4 className="cart-empty__title">{title}</h4>
            <p className="cart-empty__desc">{description}</p>
            <Link to="/">
                <button className="cart-empty__btn">
                    <img src="/assets/cart/arrow.svg" alt="back"/> 
                    <span>Вернуться назад</span>
                </button>
            </Link>
            
        </div> 
    );
}
 
export default CartStatus;