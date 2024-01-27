import { FormGroup, TextField, Button, Container } from '@mui/material';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../api/requests";
import Alert from '@mui/material/Alert';

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(false)
        setSuccess(false)
        const res = await register(username, password, email);
        if (res.error) setError(res.error)
        else setSuccess(res.message)

    }
    return (
        <Container>
            <FormGroup autoComplete="off" onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto"}}>
                
                {error &&
                    Object.keys(error).map(e => (
                        <Alert severity="error" style={{ marginTop: "20px" }}>
                            {error[e]}
                        </Alert>
                    )
                    )   
                }

                {success &&
                    <Alert severity="success" style={{ marginTop: "20px" }}>
                        {success}
                    </Alert>
                }

                <h2>Registration Form</h2>
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
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={email}
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
                <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>Submit</Button>

                <small style={{ marginTop: "20px" }}>Already have an account?
                    <Link to="/login"> Login here</Link>
                </small>
            </ FormGroup>
        </ Container>
    );
}

export default Registration;