import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { signinAxios } from "../../api/auth";
import "../../styles/form.css";

export function LoginForm() {
  const [error, setError] = useState(null);
  let user = JSON.parse(sessionStorage.getItem("user"));

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#passw").value;
    const userObject = {
      username,
      email,
      password,
    };
    const form = document.querySelector("#form-signin");
    form.reset();

    if (username === "" || email === "" || password === "") {
      setError("You must fill all spaces");
      return;
    }

    try {
      const response = await signinAxios(userObject);
      const { user, token } = response.data;
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="content-form">
        {user ? <Navigate to="/" /> : null}
        <form
          className="form form-signin card p-2"
          id="form-signin"
          onSubmit={handleSubmit}
          onChange={() => setError(null)}
        >
          {error ? (
            <div className="bg-danger p-2 w-100 text-white text-center">
              {error}
            </div>
          ) : null}
          <div className="form-group">
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="passw"
              id="passw"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-success">Send</button>
        </form>
      </div>
    </>
  );
}
