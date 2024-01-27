import { FormGroup, TextField, Button, Container } from '@mui/material';
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { request_reset, reset_password } from "../../api/requests";
import Alert from '@mui/material/Alert';

const ResetPassword = () => {
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)

    const { uidb64, token } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false)
        if (token) {
            const res = await reset_password(password, uidb64, token)
            if(res.error) setError(res.error)
            else setSuccess(res.message)
        }
        else {
            const res = await request_reset(email)
            if (res.error) setError(res.error)
            else setSuccess(res.message)
        }
    }
    return (
        <>
            <Container>
                <FormGroup autoComplete="off" onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
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

                    <h2>Reset Password Form</h2>
                    {token ?
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
                        :
                        <TextField
                            label="Email"
                            onChange={e => setEmail(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="email"
                            value={email}
                            fullWidth
                            sx={{ mb: 3 }}
                        />
                    }
                    <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>
                        {token ? "Update" : "Request"}
                    </Button>
                </ FormGroup>
            </ Container>
        </>
    );
}

export default ResetPassword;