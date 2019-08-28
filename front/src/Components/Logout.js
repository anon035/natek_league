import React from 'react';
import Fetch from './Fetch';

const Logout = () => {
    Fetch.logout();
    return <div>Please wait</div>;
} 

export default Logout;