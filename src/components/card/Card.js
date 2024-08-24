import { useContext } from "react";
import ContentLoader from "react-content-loader";
import "./card.scss";
import AppContext from "../../context";
import { Link } from "react-router-dom";

const Card = ({ 
    id, img, gender, title, price, 
    isLoading, showBtns = true
}) => {

    const { isCardAdded, isFavAdded, onFavorites, onAddToCart } = useContext(AppContext);

    
    const addToCart = () => {
        onAddToCart({ id, img, title, gender, price });
    }

    const addLike = () => {
        onFavorites({ id, img, title, gender, price });
    }

    return (  

        <>
            {    
                isLoading 
                ?
                <div className="content-loader">
                    <ContentLoader    
                        speed={2}
                        width={150}
                        height={210}
                        viewBox="0 0 150 190"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="130" rx="3" ry="3" width="91" height="15" /> 
                        <rect x="0" y="107" rx="3" ry="3" width="150" height="15" /> 
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
                        <rect x="0" y="165" rx="8" ry="8" width="80" height="24" /> 
                        <rect x="114" y="157" rx="8" ry="8" width="32" height="32" />
                    </ContentLoader>
                </div>
                :
                <div className="card">                
                    {
                        showBtns && <button className={isFavAdded(id) ? "heart-btn heart-btn--active" : "heart-btn"} onClick={addLike}>
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.8609 2.07455C13.5204 1.73389 13.1161 1.46365 12.6711 1.27927C12.2261 1.0949 11.7492 1 11.2675 1C10.7859 1 10.3089 1.0949 9.86396 1.27927C9.41898 1.46365 9.0147 1.73389 8.67419 2.07455L7.96753 2.78122L7.26086 2.07455C6.57307 1.38676 5.64022 1.00036 4.66753 1.00036C3.69484 1.00036 2.76199 1.38676 2.07419 2.07455C1.3864 2.76235 1 3.69519 1 4.66788C1 5.64057 1.3864 6.57342 2.07419 7.26122L2.78086 7.96788L7.96753 13.1546L13.1542 7.96788L13.8609 7.26122C14.2015 6.92071 14.4718 6.51643 14.6561 6.07145C14.8405 5.62648 14.9354 5.14954 14.9354 4.66788C14.9354 4.18623 14.8405 3.70929 14.6561 3.26431C14.4718 2.81934 14.2015 2.41505 13.8609 2.07455Z" stroke="#EAEAEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                    }

                    <Link to={`/card/${id}`}>
                        <img className="card__img" src={img} alt="sneakers" />
                        <span className="card__gender">{gender}</span>
                        <h4 className="card__desc">{title}</h4>
                    </Link>

                    <div className="card__footer">
                        <div className="card__price">
                            <span>Цена:</span>
                            <p>{price} руб.</p>
                        </div>

                        {
                            showBtns && <button 
                                            className={isCardAdded(id) ? "card__btn card__btn--active" : "card__btn"} 
                                            onClick={addToCart}
                                        >
                                        </button>
                        }
                    </div>
                </div>
            }
        </>
        
    );
}
 
export default Card;