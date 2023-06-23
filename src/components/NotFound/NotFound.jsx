import { useHistory } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const history = useHistory();

  function handleGoBack() {
    history.goBack();
  }

  return (
    <div className="not-found">
      <div className="not-found__info">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button className="not-found__btn-back" onClick={handleGoBack}>Назад</button>
    </div>
  );
};
