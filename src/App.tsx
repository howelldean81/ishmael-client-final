import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadIndex from '../src/Components/Uploads/UploadIndex';
import NotesIndex from '../src/Components/Notes/NotesIndex';
import Renderbook from '../src/Components/Home/Renderbook'
import AppBar from './Components/Home/AppBar'

type State = {
  token: string,
}

export default class App extends React.Component<{}, State>  {
  constructor(props: any){
    super(props);
    const token = localStorage.getItem('token')
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
        <div className="App">
            <Router>
              <header className="App-header">
              <AppBar 
              clickLogout={this.clearToken.bind(this)} 
              updateToken={this.updateToken.bind(this)} 
              token={this.state.token}/>
            </header>
            {this.state.token ? (

            <Switch>
                  <Route exact path="/notes"><NotesIndex token={this.state.token} /></Route>
                  <Route exact path="/upload"><UploadIndex  token={this.state.token} /></Route>
                  <Route exact path="/render"><Renderbook  token={this.state.token} /></Route>
                </Switch>
            ) : (null)} 
            </Router>
         </div>
    );
  }
}