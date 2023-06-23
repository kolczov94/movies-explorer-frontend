import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";

function ProtectedRoute({ component: Component, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <Route>
      { '_id' in currentUser ? <Component {...props} /> : <Redirect to="/" />}
    </Route>
  )
}

export default ProtectedRoute;