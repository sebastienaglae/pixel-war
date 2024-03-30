// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './AuthForms.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordsMatch: false // Initially set to false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            // After updating state, check if passwords match
            const { password, confirmPassword } = this.state;
            if (password === confirmPassword) {
                this.setState({ passwordsMatch: true });
            } else {
                this.setState({ passwordsMatch: false });
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // Handle form submission when passwords match
        console.log('Form submitted successfully.');
    }

    render() {
        const { passwordsMatch } = this.state;
        return (
            <div className="auth-container">
                <h2>Signup Page</h2>
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" name="confirmPassword" onChange={this.handleChange} />
                        {!passwordsMatch && <span className="error-message">Passwords do not match</span>}
                    </div>
                    <button type="submit" disabled={!passwordsMatch}>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default Signup;
