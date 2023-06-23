import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';

import CurrentUserContext from '../../context/CurrentUserContext';

import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import mainApi from '../../utils/MainApi';
import {
  MESSAGE_ERROR_LOGIN,
  MESSAGE_ERROR_REGISTER,
  MESSAGE_ERROR_SERVER,
  MESSAGE_UPDATE
} from '../../utils/constants';
import RedirectRoute from '../RedirectRoute/RedirectRoute';

function App() {
  const [isReady, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [popup, setPopup] = useState({ status: false, text: '' });

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setPopup(prevStat => ({ ...prevStat, status: false }));
  }, [location]);

  useEffect(() => {
    mainApi.getUserInfo()
      .then(user => {
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user);
        }
      })
      .catch(console.log)
      .finally(() => setReady(true));

    if (loggedIn) {
      mainApi.getMovies()
        .then(data => {
          setSavedMovies(data)
        })
        .catch(console.log);
    }
  }, [loggedIn]);

  function setAuthState(data) {
    console.log(data);
    setReady(false);
    setLoggedIn(true);
    history.push('/movies');
  }

  function clearAuthState(data) {
    console.log(data);
    setLoggedIn(false);
    setCurrentUser({})
    localStorage.clear();
    history.push('/');
  }

  function handleLogin({ email, password }) {
    mainApi.auth({ email, password })
      .then(setAuthState)
      .catch((err) => {
        if (err.response.status === 401) {
          setPopup({ status: true, text: MESSAGE_ERROR_LOGIN });
        } else {
          setPopup({ status: true, text: MESSAGE_ERROR_SERVER });
        }
        console.log(err)
      });
  }

  function handleRegister({ name, email, password }) {
    mainApi.register({ name, email, password })
      .then(setAuthState)
      .catch(err => {
        if (err.response.status === 409) {
          setPopup({ status: true, text: MESSAGE_ERROR_REGISTER });
        } else {
          setPopup({ status: true, text: MESSAGE_ERROR_SERVER });
        }
        console.log(err)
      });
  }

  function handleSignout() {
    mainApi.signout()
      .then(clearAuthState)
      .catch(err => {
        console.log(err)
      });
  }

  function handleChangeMovie(action, movie) {
    if (action === 'save') {
      mainApi.saveMovie(movie)
        .then(data => setSavedMovies(prevStat => [...prevStat, data]))
        .catch(clearAuthState);
    }
    if (action === 'remove') {
      const id = movie['_id'] ? movie['_id'] : savedMovies.find(item => item.movieId === movie.id)['_id'];
      mainApi.removeMovie(id)
        .then(res => {
          setSavedMovies(prevStat => prevStat.filter(item => item['_id'] !== res['_id']));
        })
        .catch(clearAuthState);
    }
  }

  function handleUpdateUser(data) {
    mainApi.updateUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        setPopup({ status: true, text: MESSAGE_UPDATE });
      })
      .catch(err => {
        console.log(err);
        setPopup({ status: true, text: MESSAGE_ERROR_SERVER });
      });
  }

  function popupClose() {
    setPopup(prevStat => ({ ...prevStat, status: false }));
  }

  return (
    <div className="app">
      {isReady
        ? <CurrentUserContext.Provider value={currentUser} >
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <RedirectRoute
              exact
              path="/signin"
              component={Login}
              onLogin={handleLogin}
            />

            <RedirectRoute
              exact
              path="/signup"
              component={Register}
              onRegister={handleRegister}
            />

            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              savedMovies={savedMovies}
              onChangeMovie={handleChangeMovie}
            />

            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMovies}
              savedMovies={savedMovies}
              onChangeMovie={handleChangeMovie}
            />

            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              onSignout={handleSignout}
              onUpdate={handleUpdateUser}
            />

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
        : <></>
      }
      <Popup
        isOpen={popup.status}
        onClose={popupClose}
        text={popup.text}
      />
    </div>

  );
}

export default App;
