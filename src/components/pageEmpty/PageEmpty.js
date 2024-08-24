import "./pageEmpty.scss";
import { Link } from "react-router-dom";

const PageEmpty = ({ img, title, desc, imgSize }) => {
    return ( 
        <section className="empty">
            <div className="empty__content">
                <img width={imgSize} src={img} alt="emoji"/>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link to="/">
                    <button className="back-btn">
                        <img src="/assets/cart/arrow.svg" alt="back"/>
                        <span>Вернуться назад</span>
                    </button>
                </Link>
            </div>
        </section>
    );
}
 
export default PageEmpty;