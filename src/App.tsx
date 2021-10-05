import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Components/Home/home';

type State = {
  token: string,
}

export default class App extends React.Component<{}, State>  {
  constructor(props: any){
    super(props)

    let token = localStorage.getItem('token')
    this.state = {
      token: token ? token : '',
    } 
  };    
  
  updateToken(newToken: string){
    localStorage.setItem('token', newToken);
    console.log(newToken)
    this.setState({
      token: newToken
    });
  }

  clearToken(){
    localStorage.clear();
    this.setState({
      token: ""
    })
  }
  
  render(){
    
    return (
      <div className="stars">
        <div className="twinkling">
          <div className="clouds">
            <React.Fragment>
            <Router>
              <Home clearToken={this.clearToken.bind(this)} updateToken={this.updateToken.bind(this)} token={this.state.token}/>
            </Router>
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}