import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { signupAxios } from "../../api/auth";
import "../../styles/form.css";

export function RegisterForm() {
  const [error, setError] = useState(null);
  async function handleRegister(e) {
    e.preventDefault();
    try {
      setError(null);
      const form = document.getElementById("form-register");
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password =
        document.querySelector("#password").value ===
        document.querySelector("#confirm-password").value
          ? document.querySelector("#password").value
          : null;
      const data = {
        username,
        email,
        password,
      };
      form.reset();

      if (username === "" || email === "" || password === "") {
        setError("Fill all spaces");
        return;
      }

      if (!password) {
        setError("Password not equals");
        return;
      }

      const response = await (await signupAxios(data)).data;
      sessionStorage.setItem("user", JSON.stringify(response.user));
      sessionStorage.setItem("token", response.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  // const { user, setMainUser, setMainToken } = useContext(AppContext);
  let user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="og:title" content="Products"/>
        <meta name="og:description" content="This page is an example of a simple crud with login and register, using mongodb as database" />
        <meta name="og:url" content="https://sore-blue-panther-shoe.cyclic.app/"/>
        <meta name="og:image" content="https://sore-blue-panther-shoe.cyclic.app/static/vite.svg"/>
      </Helmet>
      <div className="content-form form-register">
        {user ? <Navigate to="/" /> : null}
        <form
          className="form card p-3"
          id="form-register"
          onSubmit={handleRegister}
          onChange={() => setError(null)}
        >
          {error ? (
            <div className="bg-danger p-2 w-100 text-white text-center">
              {error}
            </div>
          ) : null}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className="form-control"
            />
          </div>
          <button className="btn btn-success">Send</button>
        </form>
      </div>
    </>
  );
}
