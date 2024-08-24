import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import AppContext from "./context";
import Header from "./components/header/Header";

import Home from "./pages/Home";
import Card from "./pages/Card";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import "./App.scss";

function App() {
    const [products, setProducts] = useState([]);
    const [cartItem, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [cartData, favoritesData, productData] = await Promise.all([ 
                    axios.get('https://66bca1f524da2de7ff6b4bb2.mockapi.io/carts'), 
                    axios.get('https://66b9c6c4fa763ff550f97640.mockapi.io/favorites'),
                    axios.get('https://66b9c6c4fa763ff550f97640.mockapi.io/products'),
                ])

                // const cartData = await axios.get('https://66bca1f524da2de7ff6b4bb2.mockapi.io/carts')
                // const favoritesData = await axios.get('https://66b9c6c4fa763ff550f97640.mockapi.io/favorites');
                // const productData = await axios.get('https://66b9c6c4fa763ff550f97640.mockapi.io/products');

                setCartItems(cartData.data);
                setFavorites(favoritesData.data);
                setProducts(productData.data);

                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при загрузке товара');
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItem.find(itemObj => Number(itemObj.id) === Number(obj.id));
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
                fetch(`https://66bca1f524da2de7ff6b4bb2.mockapi.io/carts/${findItem.apiId}`, {
                    method: "DELETE"
                })
            } else {
                const { data } = await axios.post('https://66bca1f524da2de7ff6b4bb2.mockapi.io/carts', obj);
                setCartItems(prev => [...prev, data]);
            }
        } catch(error) {    
            alert('Не получилось добавить в корзину');
            console.log(error);
        } 
    }

    const removeCartItem = (obj) => {
        try {
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            fetch(`https://66bca1f524da2de7ff6b4bb2.mockapi.io/carts/${obj.apiId}`, {
                method: "DELETE"
            })
        } catch (error) {
            alert('Не удалось удалить из корзины')
            console.log(error);
        }
    }

    const onFavorites = async (obj) => {
        try {
            const findItem = favorites.find(favObj => favObj.id === obj.id)
            if (findItem) {
                fetch(`https://66b9c6c4fa763ff550f97640.mockapi.io/favorites/${findItem.apiId}`, {
                    method: "DELETE"
                })
                setFavorites(prev => prev.filter((item => item.id !== obj.id)))
            } else {
                const { data } = await axios.post(`https://66b9c6c4fa763ff550f97640.mockapi.io/favorites`, obj)
                setFavorites(prev => [...prev, data]);   
            }
        } catch(error) {
            alert('Не удалось добавить в избранные');
            console.log(error);
        }
    }

    const changeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }    

    const isCardAdded = (id) => {
        return cartItem.some((obj) => Number(obj.id) === Number(id));
    }

    const isFavAdded = (id) => {
        return favorites.some((obj) => Number(obj.id) === Number(id))
    }

  return (
        <AppContext.Provider value={
            { 
                products, cartItem, favorites, 
                isCardAdded, isFavAdded, onFavorites, onAddToCart,
                setCartItems, setIsLoading, isLoading
            }
        }>
            <div className="App">
                <Router>
                    <Header />   
                    <Routes>
                        <Route path="/" element={ 
                            <Home 
                                changeSearchInput={changeSearchInput}
                                searchValue={searchValue}
                            />} 
                        />
                        <Route
                            path="/cart" element={
                                <Cart 
                                    removeItem={removeCartItem} 
                                /> 
                            }
                        />
                        <Route path="/favorites" element={ 
                            <Favorites
                                onFavorites={onFavorites}
                                onAddToCart={onAddToCart}
                            />}
                        />
                        <Route path="/orders" element={
                            <Orders/>} 
                        />
                        <Route path="/card/:id" element={<Card/>}/>
                    </Routes>
                </Router>
            </div>
        </AppContext.Provider>
  );
}

export default App;
