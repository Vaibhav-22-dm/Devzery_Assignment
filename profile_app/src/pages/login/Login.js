
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, TextField, Button, Container } from '@mui/material';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/requests";
import Alert from '@mui/material/Alert';

const Login = () => {
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(false)
        const res = await login(username, password)
        if (res.error) setError(res.error)
        else {
            window.localStorage.setItem('token', res.token)
            window.localStorage.setItem('username', res.username)
            window.localStorage.setItem('email', res.email)
            navigate("/dashboard")
        }
    }
    return (
        <Container>
            <FormGroup autoComplete="off" onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto", marginTop: "20px" }}>
                {error &&
                    <Alert severity="error">
                        {error}
                    </Alert>
                }
                <h2>Login Form</h2>
                <TextField
                    label="Username"
                    onChange={e => setUsername(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="username"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={username}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>Login</Button>

                <small style={{ marginTop: "20px" }}>Need an account?
                    <Link to="/"> Register here</Link>
                </small>

                <small style={{ marginTop: "20px" }}>Forgot Password?
                    <Link to="/reset_password"> Reset Here</Link>
                </small>
            </ FormGroup>
        </ Container>
    );
}

export default Login;