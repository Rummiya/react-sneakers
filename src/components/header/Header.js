import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

import logo from "./../../assets/header/header-logo.png";
import cart from "./../../assets/header/cart.svg";
import user from "./../../assets/header/user.svg";
import heart from "./../../assets/header/heart.svg";

import "./header.scss";

const Header = (props) => {
    const { totalPrice } = useCart()
    return ( 
        <header className="header">

                <Link to="/">
                    <div className="header__logo">
                        <img className="logo" src={logo} alt="logo" />
                        <div>
                            <h3 className="logo__title">React Sneakers</h3>
                            <p className="logo__desc">Магазин лучших кроссовок</p>
                        </div>
                    </div>
                </Link>

                <ul className="header__list">
                    <Link to="/cart">
                        <li className="header__list-item" onClick={props.showCart}>
                            <img src={cart} alt="" />
                            <span>{totalPrice} руб.</span>
                        </li>
                    </Link>
                    <Link to="/favorites">
                        <li className="header__list-item">
                                <img src={heart} alt="" />
                                <span>Избранные</span>
                        </li>
                    </Link>
                    <Link to="/orders">
                        <li className="header__list-item">
                            <img src={user} alt="" />
                            <span>Мои заказы</span>
                        </li>
                    </Link>
                </ul>
        </header>
    );
}
 
export default Header;