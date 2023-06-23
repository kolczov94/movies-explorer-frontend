import Container from "../Container/Container";
import SectionTitle from "../SectionTitle/SectionTitle";
import Scale from "./Scale/Scale";
import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project">
      <Container>
        <SectionTitle title='О проекте' />
        <div className="about-project__content">
          <div className="about-project__two-columns">
            <div className="about-project__column">
              <h3 className="about-project__column-title">Дипломный проект включал 5 этапов</h3>
              <p className="about-project__column-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about-project__column">
              <h3 className="about-project__column-title">На выполнение диплома ушло 5 недель</h3>
              <p className="about-project__column-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className="about-project__scale">
            <Scale />
          </div>
        </div>
      </Container>
    </section>
  );
};
