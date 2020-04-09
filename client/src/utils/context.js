import React from "react";

export default React.createContext({
    isLoggedIn: false,
    id: "",
    email: "",
    userType: "",
    updatedState: () => {}
    
})
