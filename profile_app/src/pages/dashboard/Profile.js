import { FormGroup, TextField, Button } from '@mui/material';
import React, { useState } from "react";
import { update } from "../../api/requests";
import Alert from '@mui/material/Alert';

const Profile = () => {
    const [email, setEmail] = useState(localStorage.getItem("email"))
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [error, setError] = useState(false)
    const [success, setSucess] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError(false)
        setSucess(false)

        const res = await update(username, email);

        if(res.error){
            setError(res.error)
        }
        else{
            setSucess(res.message)
            localStorage.setItem("username", username)
            localStorage.setItem("email", email)
        }

    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <FormGroup autoComplete="off" onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
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

                <h2>Profile Details</h2>
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
                <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>Update</Button>
            </ FormGroup>
        </div>
        
        

    );
}
 
export default Profile;