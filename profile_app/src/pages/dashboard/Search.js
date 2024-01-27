import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { search } from "../../api/requests";

const Search = () => {
    const [query, setQuery] = useState(null)
    const [users, setUsers] = useState(null)
    
    useEffect(() => {
        search(query).then(res => {
            setUsers(res)
        });
    }, [query])
    

    return (
        <>
            <TextField 
                placeholder='Search'
                fullWidth="true"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            
            <List sx={{ width: '100%', fullWidth: "true", bgcolor: 'background.paper' }}>
                {users && 
                users.map((user, index) => (
                    <>
                        <ListItem alignItems="flex-start" key={index}>
                            <ListItemAvatar>
                                <Avatar alt={user.username} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.username}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >

                                            {user.email}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
                ))
                
                }
            </List>
        </>
    );
}
 
export default Search;