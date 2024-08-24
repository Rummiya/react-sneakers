import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../context";
import ContentLoader from "react-content-loader";
// import productList from "../helpers/product-list";

const Card = () => {
    // const products = productList;
    const { products, isLoading, onFavorites, onAddToCart, isCardAdded, isFavAdded } = useContext(AppContext);
    const {id} = useParams();
    const product = products[id - 1];    

    const addToCart = () => {
        onAddToCart(product)
    }

    const addLike = () => {
        onFavorites(product)
    }

    return ( 
        <>
        {
            (isLoading) 
            ?
            <div className="loader">
                <div className="container">
                    <ContentLoader 
                        speed={2}
                        width={960}
                        height={337}
                        viewBox="0 0 960 337"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="550" y="70" rx="5" ry="5" width="220" height="25" /> 
                        <rect x="550" y="0" rx="8" ry="8" width="350" height="50" /> 
                        <rect x="50" y="0" rx="25" ry="25" width="400" height="337" /> 
                        <rect x="550" y="140" rx="8" ry="8" width="300" height="80" /> 
                        <rect x="550" y="250" rx="8" ry="8" width="350" height="80" />
                    </ContentLoader>
                </div>
            </div>
            :
            <div className="card-page">
                <div className="container">
                    <div className="card-page__header">
                        <Link to="/">
                            <button className="back">
                                <img src="/assets/favorites/mini-arrow.svg" alt="arrow"/>
                            </button>
                        </Link>
                        <h1 className="title">О кроссовках</h1>
                    </div>

                    <div className="content">

                        <img width={400} className="content__img" src={product.img} alt="img"/>

                        <div className="center"></div>

                        <div className="content__desc">
                            <h2 className="content__title">{product.title}</h2>
                            <p>{product.gender}</p>
                            <p className="content__price"><b>Цена:</b> {product.price} руб.</p>

                            <div className="sizes">
                                <p className="sizes__title"><b>Размеры:</b></p>
                                <div className="sizes__grid">
                                    <button>35</button>
                                    <button>36</button>
                                    <button>37</button>
                                    <button>38</button>
                                    <button>39</button>
                                    <button>40</button>
                                </div>
                            </div>

                            <div className="content__btns">
                                <button onClick={addToCart}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill={isCardAdded(product.id) ? '#2b7b39' : 'none'} xmlns="http:www.w3.org/2000/svg">
                                        <path d="M7.54548 18.1818C7.99735 18.1818 8.36366 17.8155 8.36366 17.3636C8.36366 16.9118 7.99735 16.5455 7.54548 16.5455C7.09361 16.5455 6.72729 16.9118 6.72729 17.3636C6.72729 17.8155 7.09361 18.1818 7.54548 18.1818Z" stroke="#2b7b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16.5455 18.1818C16.9973 18.1818 17.3637 17.8155 17.3637 17.3636C17.3637 16.9118 16.9973 16.5455 16.5455 16.5455C16.0936 16.5455 15.7273 16.9118 15.7273 17.3636C15.7273 17.8155 16.0936 18.1818 16.5455 18.1818Z" stroke="#2b7b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 1H4.27273L6.46545 11.9555C6.54027 12.3321 6.7452 12.6705 7.04436 12.9113C7.34351 13.1522 7.71784 13.2801 8.10182 13.2727H16.0545C16.4385 13.2801 16.8129 13.1522 17.112 12.9113C17.4112 12.6705 17.6161 12.3321 17.6909 11.9555L19 5.09091H5.09091" stroke="#2b7b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>{isCardAdded(product.id) ? 'Уже в корзине' : 'Добавить в корзину'}</span> 
                                </button>
                                <button onClick={addLike}>
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill={isFavAdded(product.id) ? '#f9487a' : 'none'} xmlns="http:www.w3.org/2000/svg">
                                        <path d="M13.8609 2.07455C13.5204 1.73389 13.1161 1.46365 12.6711 1.27927C12.2261 1.0949 11.7492 1 11.2675 1C10.7859 1 10.3089 1.0949 9.86396 1.27927C9.41898 1.46365 9.0147 1.73389 8.67419 2.07455L7.96753 2.78122L7.26086 2.07455C6.57307 1.38676 5.64022 1.00036 4.66753 1.00036C3.69484 1.00036 2.76199 1.38676 2.07419 2.07455C1.3864 2.76235 1 3.69519 1 4.66788C1 5.64057 1.3864 6.57342 2.07419 7.26122L2.78086 7.96788L7.96753 13.1546L13.1542 7.96788L13.8609 7.26122C14.2015 6.92071 14.4718 6.51643 14.6561 6.07145C14.8405 5.62648 14.9354 5.14954 14.9354 4.66788C14.9354 4.18623 14.8405 3.70929 14.6561 3.26431C14.4718 2.81934 14.2015 2.41505 13.8609 2.07455Z" stroke="#f9487a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>{isFavAdded(product.id) ? 'В избранных' : 'В избранные'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

         

        </>

       
    );
}
 
export default Card;