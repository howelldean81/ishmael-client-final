import React from 'react';
import logo from '../../Assets/ishmael.png';
import './Home.css';

import {
  Tooltip,
  Toolbar,
  AppBar,
  ButtonGroup,
  Grid,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  IconButton
  
} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import NoteIcon from '@material-ui/icons/Note';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

import { Link} from 'react-router-dom'
import Login from '../Auth/Login';
import Register from '../Auth/Register';



interface Props  {
  token: string,
  clickLogout: () => void;
  updateToken: (newToken: string) => void;
}

type State = {
  register: boolean;
  login: boolean;
  left: boolean,
  
}

class NavBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
          register: false,
          login: false,
          left: false,
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
      <div>
          <Grid container spacing={10} style={{padding: 24}}>
            <Grid item xs={12} sm={6} lg={4} xl={12}>
          <AppBar id="appBar" position="fixed" >
            <Toolbar className="root" >
            <img src={logo} id="logo" alt="Logo" />
            
				<ButtonGroup>
					{!this.props.token && (
            <Register 
            updateToken={this.props.updateToken}
						/>
					)}
					{this.props.token ? (
            <>
            <List>
                <ListItem button id="myLibrary">
                <Link to="/upload" className="links">
                  <Tooltip title="Library" arrow>
                    <ListItemIcon className="drawerIcons">
                        <LocalLibraryIcon id="ishIcons"/>
                    </ListItemIcon>
                  </Tooltip>
                </Link>
                </ListItem>
            </List>
            <Divider />
            {/* <List>
                <ListItem button id="myRender">
                <Link to="/render" className="links">
                  <Tooltip title="Render" arrow>
                    <ListItemIcon className="drawerIcons">
                        <MenuBookIcon />
                    </ListItemIcon>
                    </Tooltip>
                </Link>
                </ListItem>
            </List> */}
            <Divider />
            <List>
                <ListItem button id="myNotes">
                <Link to="/notes" className="links">
                  <Tooltip title="Notes" arrow>
                    <ListItemIcon className="drawerIcons">
                        <NoteIcon id="ishIcons" />
                    </ListItemIcon>
                    </Tooltip>
                </Link>
                </ListItem>
            </List>
            <Divider />
              <Tooltip title="Logout" arrow>
                <IconButton id="ishBtn" aria-label="logout"> 
						    <ExitToAppIcon  id="ishIcons" onClick={this.props.clickLogout} />
                </IconButton>
              </Tooltip>
							
            </>
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

export default (NavBar);