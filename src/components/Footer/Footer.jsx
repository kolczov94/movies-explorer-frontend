import Container from "../Container/Container";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__columns">
            <div className="footer__copyright">© 2022</div>
            <div className="footer__sites">
              <a
                className="footer__link"
                href="https://practicum.yandex.ru"
                target="_blank"
                rel="noreferrer noopener"
              >Яндекс.Практикум</a>
              <a
                className="footer__link"
                href="https://github.com/Yandex-Practicum"
                target="_blank"
                rel="noreferrer noopener"
              >Github</a>
            </div>
          </div>
        </div>
      </Container>
    </footer >
  );
};
