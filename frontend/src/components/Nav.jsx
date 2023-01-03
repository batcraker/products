import { Link } from "react-router-dom";
import "../styles/menu.css"

function NavAdmin() {
  return (
    <ul className="main-menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  );
}

function NavNoSession() {
  return (
    <ul className="main-menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );
}

function NavSession() {
  return (
    <ul className="main-menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">About</Link>
      </li>
      <li>
        <Link to="/">Contact</Link>
      </li>
    </ul>
  );
}

export function Nav(props) {
  let user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <header className="header">
      <nav className="nav">
        {user ? user.roles.map(role => role.name === "admin").filter(admin => admin)[0] ? <NavAdmin/>:<NavSession/>:<NavNoSession/>}
      </nav>
    </header>
  );
}
