import { Link } from 'react-router-dom';
import PageEmpty from '../components/pageEmpty/PageEmpty';
import Card from '../components/card/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Безымянная самозапускающаяся функция
    (async () => {
      try {
        const { data } = await axios.get('https://66bca1f524da2de7ff6b4bb2.mockapi.io/orders');
        const reverseData = data.reverse();
        setOrders(reverseData);

        // Соединяет два массива
        // setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Ошибка при загрузке заказов');
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="def-page">
      <div className="container">
        {orders.length ? (
          <>
            <div className="def-page__top">
              <Link to="/">
                <button className="back">
                  <img src="/assets/favorites/mini-arrow.svg" alt="arrow" />
                </button>
              </Link>
              <h1 className="def-page__title">История заказов</h1>
            </div>
            <section className="def-page__content">
              {orders.map((order) => (
                <div className="order" key={order.id}>
                  <div className="order__top">
                    <h3 className="order__title">Заказ #{order.id}</h3>
                  </div>
                  <div className="order__items">
                    {order.items.map((item, i) => (
                      <Card key={i} showBtns={false} {...item} />
                    ))}
                  </div>
                  <div className="order__info">
                    <h4>Информация о заказе:</h4>
                    <div className="order__info-item">
                      <p>Количество:</p>
                      <div className="dashed"></div>
                      <p className="bold">{order.items.length} шт.</p>
                    </div>
                    <div className="order__info-item">
                      <p>Дата оформления:</p>
                      <div className="dashed"></div>
                      <p className="bold">{order.time}</p>
                    </div>
                    <div className="order__info-item">
                      <p>
                        Общая стоимость <small>( включая налог )</small> :
                      </p>
                      <div className="dashed"></div>
                      <p className="bold">{order.priceTotal} руб.</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
          <PageEmpty
            title={'Заказов нет'}
            img={'/assets/favorites/image-2.png'}
            desc={'Вы ничего не заказывали, поэтому история заказов пуста'}
            imgSize={70}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
