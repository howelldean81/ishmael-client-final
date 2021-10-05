import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import logo from '../../Assets/ishmael.png';
import { Link } from 'react-router-dom';
import './Home.css';
import Home from '../Home/home'

import Login from '../Auth/Login';
import Register from '../Auth/Register';

interface Props {
  token: string;
  clickLogout: () => void;
  updateToken: (newToken: string) => void;
}

type State = {
  register: boolean;
  login: boolean;
  
}

export default class TopBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
          register: false,
          login: false,
        
        }
    }

  
    handleOpenReg = () => {
      this.setState({
        register: true,
      });
    };

    handleOpenLog = () => {
      this.setState({
        login: true,
      })
    }

    HandleCloseReg = () => {
      this.setState({
        register: false,
      })
    }

    handleCloseLog = () => {
      this.setState({
        login: false,
      })
    }

    render() {
      
    return (
      <div className="container">

          <Grid container spacing={10} style={{padding: 24}}>
            <Grid item xs={12} sm={6} lg={4} xl={12}>
          <AppBar id="appBar" position="fixed" >
            <Toolbar className="root">
            <img src={logo} id="logo" alt="Logo" />
				<ButtonGroup>
					{!this.props.token && (
            <Register 
            updateToken={this.props.updateToken}
						/>
					)}
					{this.props.token ? (
            <ButtonGroup>
              <Button id="ishButton" variant="outlined">Upload</Button>
						  <Button id="ishButton" onClick={this.props.clickLogout}>
							LOGOUT
						</Button>
            </ButtonGroup>
					) : (
            <Login 
						updateToken={this.props.updateToken} />
					)}
				</ButtonGroup>
            </Toolbar>
          </AppBar>
            </Grid>
          </Grid>
    
    </div>
      );
    }
};