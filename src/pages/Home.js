import { useContext, useState } from "react";
import AppContext from "../context";
import Card from "../components/card/Card";

import search from "./../assets/products/icons/search.svg";
import Slider from "../components/slider/Slider";
// import productList from "../helpers/product-list";

const Home = ({ 
    changeSearchInput, searchValue, 
}) => {

    const { products, isLoading} = useContext(AppContext);
    const [selectedTab, setSelectedTab] = useState('');

    const renderCards = () => {
        const filteredProduct = products.filter(item => 
            item.title.toLowerCase().includes(searchValue.toLowerCase())
            &&  item.gender.includes(selectedTab)
        )

        return (isLoading ? [...Array(10)] : filteredProduct).map((product, i) => (
            <Card 
                key={i}
                isLoading={isLoading}
                {...product}
            />
        ))
    }

    return (  
        <div className="home">

            <div className="slider">
                <div className="container">
                    <Slider/>
                </div>
            </div>

            <section className="products">
                <div className="container">
                    <h1 className="products__title">Все кроссовки</h1>
                    <div className="products__header">
                        {
                            !isLoading &&   <div className="product__tabs">
                                                <div className="tabs-controls">
                                                    <button onClick={() => setSelectedTab('')} className={selectedTab === '' ? "tabs-controls__btn tabs-controls__btn--active" : "tabs-controls__btn"}>Все</button>
                                                    <button onClick={() => setSelectedTab('Женские')} className={selectedTab === 'Женские' ? "tabs-controls__btn tabs-controls__btn--active" : "tabs-controls__btn"}>Женские</button>
                                                    <button onClick={() => setSelectedTab('Мужские')} className={selectedTab === 'Мужские' ? "tabs-controls__btn tabs-controls__btn--active" : "tabs-controls__btn"}>Мужские</button>
                                                </div>
                                            </div>
                        }

                        {
                            !isLoading &&   <div className="products__search-form">
                                                <img src={search} alt="search"/>
                                                <input onChange={changeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
                                            </div>
                        }
                    </div>

                    <div className="products__list">
                        {
                            renderCards()
                        }
                        
                    </div>
                </div>
            </section>

        </div>  
    );
}
 
export default Home;