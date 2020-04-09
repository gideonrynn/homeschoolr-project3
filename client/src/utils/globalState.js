import React, { Component } from 'react';
import AuthContext from './context'

class GlobalState extends Component {
    
  state = {
    isLoggedIn: false,
    id: "",
    email: "",
    userType: ""
  }

  updatedState = (isLoggedIn, id, email, userType) => {
    this.setState({isLoggedIn: isLoggedIn, id: id, email: email, userType: userType})
    console.log(this.state)
  };

    render() {
        return <AuthContext.Provider value={{
            isLoggedIn: this.state.isLoggedIn,
            id: this.state.id,
            email: this.state.email,
            userType: this.state.userType,
            updatedState: this.updatedState
            }}>{this.props.children}</AuthContext.Provider>
    }
}

export default GlobalState;