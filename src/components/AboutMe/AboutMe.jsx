import Container from "../Container/Container";
import SectionTitle from "../SectionTitle/SectionTitle";
import photoImage from "../../images/photo.jpg";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-me">
      <Container>
        <SectionTitle title='Студент' />
        <div className="about-me__content">
          <div className="about-me__columns">
            <div className="about-me__info">
              <div className="about-me__name">Виталий</div>
              <div className="about-me__proffesion">Фронтенд-разработчик, 30 лет</div>
              <div className="about-me__about">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</div>
              <div className="about-me__social">Github</div>
            </div>
            <div className="about-me__photo">
              <img src={photoImage} alt="Фото студента" className="about-me__image" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );

};
