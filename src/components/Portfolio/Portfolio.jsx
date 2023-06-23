import Container from "../Container/Container";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <Container>
        <div className="portfolio__title">Портфолио</div>
        <ul className="portfolio__projects">
          <li className="portfolio__item">
            <a
              className="portfolio__project-link"
              href="https://github.com/Andrey-Koltsov/how-to-learn"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="portfolio__project-name">Статичный сайт</div>
              ↗
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__project-link"
              href="https://github.com/Andrey-Koltsov/russian-travel"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="portfolio__project-name">Адаптивный сайт</div>
              ↗
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__project-link"
              href="https://github.com/Andrey-Koltsov/react-mesto-api-full"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="portfolio__project-name">Одностраничное приложение</div>
              ↗
            </a>
          </li>
        </ul>
      </Container >
    </section>
  );
};
