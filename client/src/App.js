import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Container from '@material-ui/core/Container';

// import NavBar from "./components/NavBar";

import Wrapper from "./components/Wrapper";

import NoMatch from "./pages/NoMatch";
import LoginPage from "./pages/LoginPage";
import TeacherPage from "./pages/TeacherPage";
import ParentPage from "./pages/ParentPage";
// import Footer from "./components/Footer";

import GlobalState from './utils/globalState'

// import logo from './logo.svg';
import './App.css';

class App extends Component {

  render () {
    return (

      <GlobalState>
        <Router>
          <Container component="main" maxWidth="lg">
            <div className="mainPage">
              {/* <NavBar /> */}
              {/* <Header /> */}
              <Wrapper>
                <Route exact path="/" component={LoginPage}/>

                <Route exact path="/teacher" component={TeacherPage}/>

                <Route exact path="/parent" component={ParentPage}/>

                <Route exact path="/noMatch" component={NoMatch}/>
              </Wrapper>
              {/* <Footer /> */}
            </div>
          </Container>
        </Router>
      </GlobalState>
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
