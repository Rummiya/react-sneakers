import { useState } from "react";
import axios from "axios";

import { useCart } from "../hooks/useCart";
import CartItem from "../components/cartItem/CartItem";
import { Link } from "react-router-dom";
import PageEmpty from "../components/pageEmpty/PageEmpty";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Cart = ({ removeItem }) => {    

    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const { cartItem, totalPrice, taxPrice } = useCart();

    const getOrder = async () => {
        try {
            setIsLoading(true)
            let time = new Date().toLocaleString('ru-RU'); 

            const {data} = await axios.post('https://66bca1f524da2de7ff6b4bb2.mockapi.io/orders', {
                items: cartItem,
                priceTotal: totalPrice + taxPrice,
                time: time, 
            });
            
            cartItem.forEach(item => {
                removeItem(item);
                delay(1000);
            });

            setOrderId(data.id);   
            setIsOrderComplete(true);
            setIsLoading(false);
        } catch (error) {
            alert('Что-то пошло не так...')
        }
        
    }

    return (      
        <div className="def-page">
            <div className="container">
                {
                    (cartItem.length) 
                    ? 
                    <>  
                        <div className="def-page__top">
                            <Link to="/">
                                <button className="back">
                                    <img src="/assets/favorites/mini-arrow.svg" alt="arrow"/>
                                </button>
                            </Link>
                            <h1 className="def-page__title">Корзина</h1>
                        </div>

                        <div className="def-page__row">
                            {cartItem.map((item, i) => (
                                <CartItem 
                                    key={i} 
                                    removeItem={removeItem} 
                                    {...item}
                                />
                            ))}
                        </div>

                        <div className="cart__footer">
                            <div className="cart__total">
                                <p>Итого: </p>
                                <div className="dashed"></div>
                                <b>{totalPrice} руб. </b>
                            </div>
                            <div className="cart__total">
                                <p>Налог 5%: </p>
                                <div className="dashed"></div>
                                <b>{taxPrice} руб.</b>
                            </div>
                            <button onClick={getOrder} disabled={isLoading} className="cart__btn">
                                <span>Оформить заказ</span>
                                <img src="/assets/cart/arrow.svg" alt="arrow"/>
                            </button>
                        </div>
                    </>
                    : 
                    <PageEmpty
                            img={isOrderComplete ? '/assets/cart/order.png' : '/assets/cart/box.png'}
                            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'} 
                            desc={
                                isOrderComplete 
                                ? 
                                `Ваш заказ #${orderId} скоро будет передан курьерской доставке` 
                                : 
                                'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                            } 
                            imgSize={100}
                    />
                }
            </div>
        </div>
    );
}
 
export default Cart;