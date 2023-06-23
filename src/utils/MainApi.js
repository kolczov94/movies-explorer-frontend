import { API_URL, BEATFILM_URL } from "./constants";

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject({response, text: `Ошибка: ${response.status}, ${response.statusText}`});
  }

  register({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, password, email })
    })
      .then(this._checkResponse);
  }

  auth({ password, email }) {
    return fetch(`${this._url}/signin`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(this._checkResponse);
  }

  signout() {
    return fetch(`${this._url}/signout`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  removeMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: BEATFILM_URL + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail: BEATFILM_URL + data.image.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    })
      .then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  url: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

export default mainApi;