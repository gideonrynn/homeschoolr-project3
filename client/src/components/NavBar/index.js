import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg text-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Homeschoolr</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
                        to="/search">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={window.location.pathname === "/register" ? "nav-link active" : "nav-link"}
                        to="/search">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;  