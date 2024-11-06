import { useContext, useState } from 'react';
import Card from '../components/card/Card';
import AppContext from '../context';

import Slider from '../components/slider/Slider';
import search from './../assets/products/icons/search.svg';
// import productList from "../helpers/product-list";

const Home = ({ changeSearchInput, searchValue }) => {
	const { products, isLoading } = useContext(AppContext);
	const [selectedTab, setSelectedTab] = useState('');
	const genders = ['', 'Мужские', 'Женские'];

	const renderCards = () => {
		const filteredProduct = products.filter(
			item =>
				item.title.toLowerCase().includes(searchValue.toLowerCase()) &&
				item.gender.includes(selectedTab)
		);

		return (isLoading ? [...Array(10)] : filteredProduct).map((product, i) => (
			<Card key={i} isLoading={isLoading} {...product} />
		));
	};

	return (
		<div className='home'>
			<div className='slider'>
				<div className='container'>
					<Slider />
				</div>
			</div>

			<section className='products'>
				<div className='container'>
					<h1 className='products__title'>Все кроссовки</h1>
					<div className='products__header'>
						{!isLoading && (
							<div className='product__tabs'>
								<div className='tabs-controls'>
									{genders.map(item => (
										<button
											onClick={() => setSelectedTab(item)}
											className={
												selectedTab === item
													? 'tabs-controls__btn tabs-controls__btn--active'
													: 'tabs-controls__btn'
											}
										>
											{item === '' ? 'Все' : item}
										</button>
									))}
								</div>
							</div>
						)}

						{!isLoading && (
							<div className='products__search-form'>
								<img src={search} alt='search' />
								<input
									onChange={changeSearchInput}
									value={searchValue}
									type='text'
									placeholder='Поиск...'
								/>
							</div>
						)}
					</div>

					<div className='products__list'>{renderCards()}</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
