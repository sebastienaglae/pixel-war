// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './AuthForms.css';

class Login extends Component {
    render() {
        return (
            <div className="auth-container">
                <h2>Login Page</h2>
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" />
                    </div>
                    <p>
                        {/* Use Link component instead of <a> */}
                        <Link to="/signup">Sign up here</Link>
                    </p>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;

