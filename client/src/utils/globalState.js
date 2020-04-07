import React, { Component } from 'react';
import AuthContext from './context'

class GlobalState extends Component {
    
  state = {
    isLoggedIn: false,
    id: "",
    email: "",
    type: ""
  }

  updatedState = (isLoggedIn, id, email, type) => {
    this.setState({isLoggedIn: isLoggedIn, id: id, email: email, type: type})
    console.log(this.state)
  };

    render() {
        return <AuthContext.Provider value={{
            isLoggedIn: this.state.isLoggedIn,
            id: this.state.id,
            email: this.state.email,
            type: this.state.type,
            updatedState: this.updatedState
            }}>{this.props.children}</AuthContext.Provider>
    }
}

export default GlobalState;