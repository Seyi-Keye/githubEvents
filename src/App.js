import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

class App extends Component {
  constructor(){
    super()
    this.state = {
      value: '',
      result: [],
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleClick(){
    this.fetchUserEvent(this.state.value);
  }

  fetchUserEvent(value){
    request.get(`https://api.github.com/users/${value}/events`)
    .then((response) => {
      this.setState({result : response.data, error: ''});
    }, (error) => {
      this.setState({error: error.message});
    })
    .catch((error) => {console.log(error, 'anothe rerror')
      this.setState({error: error.message});
    })
  }

  displayTable() {
    const stuff = (this.state.error) ? (<p>{this.state.error}</p>) : (this.state.result.map((current) =>
        <div>
          <MuiThemeProvider>
            <Card>
                <CardHeader
                  title={current.created_at}
                  subtitle={current.repo.url}
                  avatar={current.actor.avatar_url}
                  key={current.id}
                />
                <CardTitle title={current.type} />
                <CardText>
                {current.type} by {current.actor.login}
                </CardText>
          </Card>
          </MuiThemeProvider>
        </div>
      ))
    return stuff;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <input placeholder='Enter github username' id='username' value={this.state.value} onChange={this.handleChange}/>
          <button onClick={this.handleClick}> Search</button>
        </header>
        {(!this.state.result.length) ? <p className="App-intro">Enter your Github Username above and the result will be displayed here</p> : this.displayTable() }
      </div>
    );
  }
}

export default App;
