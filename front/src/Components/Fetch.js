class FetchClass {
  _fetch = (url, body = {}) => {
    if (body["headers"] === undefined) {
      body["headers"] = new Headers({});
    }

    let token = sessionStorage.getItem("token");
    if (token) {
      if (!body["headers"].has("authorization")) {
        body["headers"].append("authorization", "Bearer " + token);
      }
    }

    body["Content-Type"] = "application/json";
    return fetch(
      "apie/" + url,
      body
    ).then(res => res.json());
  };

  get = (url, body = {}) => {
    body["method"] = "GET";
    return this._fetch(url, body);
  };

  post = (url, body = {}) => {
    body["method"] = "POST";
    return this._fetch(url, body);
  };

  put = (url, body = {}) => {
    body["method"] = "PUT";
    return this._fetch(url, body);
  };

  delete = (url, body = {}) => {
    body["method"] = "DELETE";
    return this._fetch(url, body);
  };

  login = (username, password) => {
    const uri = "user/login";
    const credentials = {
      username: username,
      password: password
    };
    return this.post(uri, {
      body: JSON.stringify(credentials)
    })
      .then(res => res.data.token)
      .then(result => sessionStorage.setItem("token", result))
      .then(() => {
        window.location.href = "/";
      });
  };

  _renewToken = async () => {
    let token = sessionStorage.getItem("token");

    if (token !== "") {
      let response = await this.post("user/renew-token");

      if (response && response.data && response.data.token) {
        let returnToken = response.data.token;
        sessionStorage.setItem("token", returnToken);
        if (returnToken != 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  isLogged = () => {
    return this._renewToken();
  };

  logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };
}

const Fetch = new FetchClass();
export default Fetch;
