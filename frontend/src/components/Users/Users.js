import React from 'react';
import User from './User/User';
import useStyles from './styles';

const Users = () => {
    const classes = useStyles();
    return (
        <>
            <h1>Users</h1>
            <User/>
            <User/>
        </>
    );
}

export default Users;