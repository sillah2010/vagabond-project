import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'
import axios from "axios"
import HomePage from "./components/HomePage"
import City from "./components/City"
import LogInPage from "./components/LogInPage"
import SplashPage from "./components/SplashPage"
import EditPost from './components/EditPost'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    background-image: url("http://passportinfoguide.com/wp-content/uploads/2013/11/passport.jpg"); 
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
}
`

class App extends Component {
  // setting initial state
  state = {
  cities: [],
  users: []
}

  // getting list of cities and setting state
  async componentWillMount() {
    try {
      const response = await axios.get("/api/cities")
      this.setState({cities: response.data})
      const userResponse = await axios.get("/api/users")

    } catch(error) {
      console.log(error)
    }
  }


  render() {
    const HomePageComponent = () => (<HomePage cities={this.state.cities}/>)
    return (
      <Router>
        <div>
        <NavBar />
      <Switch>
        <Route exact path="/" render={SplashPage} />
        <Route exact path="/home" render={HomePageComponent} />
        <Route exact path="/cities/:id" component={City} />
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/cities/:city_id/posts/:id" component={EditPost}/>
      </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
