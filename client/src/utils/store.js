import React, { useState } from 'react';

const initialUserState = {
    isLoggedin: false,
    id: "",
    email: "",
}

export const Context = React.createContext();

const Store = ({ children }) => {
    const [state, setState] = useState(initialUserState);

    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    );
    
};

export default Store;