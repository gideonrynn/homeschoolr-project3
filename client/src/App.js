import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";

import NoMatch from "./pages/NoMatch";

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <NavBar />
          <Header />
          <Wrapper>
            <Route exact path="/" component={NoMatch}/>
          </Wrapper>
        </div>
      </Router>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           This is the homeschoolr app!
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
