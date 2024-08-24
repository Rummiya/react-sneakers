import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card/Card";
import AppContext from "../context";
import PageEmpty from "./../components/pageEmpty/PageEmpty"

const Favorites = () => {
    
    const { favorites } = useContext(AppContext);

    return ( 
        <div className="def-page">
            <div className="container">
                {
                    (!favorites.length)
                    ?  <PageEmpty 
                            img={'/assets/favorites/image.png'} 
                            title={'Избранных нет'} 
                            desc={'Вы ничего не добавляли в избранные :('} 
                            imgSize={70}
                        />
                    :  <>
                        <div className="def-page__top">
                            <Link to="/">
                                <button className="back">
                                    <img src="/assets/favorites/mini-arrow.svg" alt="arrow"/>
                                </button>
                            </Link>
                            <h1 className="def-page__title">Избранные</h1>
                        </div>
                        <section className="def-page__content">
                            { 
                                favorites.map((favorite) => (
                                    <Card 
                                        key={favorite.id}
                                        isFavorite={true}
                                        {...favorite}
                                    />
                                ))
                            }
                        </section>
                        </>
                }

                
                    
            </div>
        </div>
    );
}
 
export default Favorites;