import { scroller } from "react-scroll";
import Container from "../Container/Container";
import promoImage from "../../images/promo.svg";
import "./Promo.css";

export default function Promo() {
  function handleScroll() {
    scroller.scrollTo('about-project', { duration: 1000, smooth: true });
  }
  return (
    <section className="promo">
      <Container>
        <div className="promo__content">
          <div className="promo__info">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className="promo__btn" type="button" onClick={handleScroll}>Узнать больше</button>
          </div>
          <img src={promoImage} alt="Изображение планеты" className="promo__image" />
        </div>
      </Container>
    </section>
  );
};
