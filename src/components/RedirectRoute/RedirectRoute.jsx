import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";

function RedirectRoute({ component: Component, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <Route>
      {currentUser['_id'] ? <Redirect to="/" /> : <Component {...props} />}
    </Route>
  )
}

export default RedirectRoute;