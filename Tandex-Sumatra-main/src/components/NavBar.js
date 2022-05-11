import { NavLink } from "react-router-dom"
import useAuth from "../auth/useAuth";

export default function Navbar() {

    const auth = useAuth();

    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/about" activeClassName="active">about</NavLink>
                </li>
                <li>
                    <NavLink exact to="/contact" activeClassName="active">contact</NavLink>
                </li>
                <li>
                    <NavLink exact to="/query" activeClassName="active">Query</NavLink>
                </li>
                <li>
                    <NavLink exact to="/register" activeClassName="active">Register</NavLink>
                </li>

                {auth.user && (
                    <li>
                        <NavLink exact to="/dashboard" activeClassName="active">Dashboard</NavLink>
                    </li>
                )}
                <li>
                    <NavLink exact to="/" activeClassName="active">Login</NavLink>
                </li>
                {auth.user && (
                    <li>
                        <button type="button" onClick={auth.logout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}