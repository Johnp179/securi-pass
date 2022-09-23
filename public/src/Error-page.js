import React from "react"
import "./scss/error-page.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {

    return (
        <div id="error-page">
            <h1>404 Page not found</h1>
            <Link to="/">Home Page</Link>
        </div>
    );
}

export default ErrorPage