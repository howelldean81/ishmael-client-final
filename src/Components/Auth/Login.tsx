import React from 'react';
import { 
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import './auth.css';
import APIURL from '../../helpers/environment';

type Props = {
    updateToken: (newToken: string) => void,
}

type LoginState = {
    username: string,
    password: string,
    handleopen: boolean,
}

export default class Login extends React.Component<Props, LoginState>{
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            handleopen: false,
        }
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ 
                username: this.state.username,
                password: this.state.password,
            }),
            headers: new Headers({
                "Content-Type": "application/json"
           })
       })
       .then(res => res.json())
       .then(data => {
           console.log(data);
           this.props.updateToken(data.token);
           this.handleClose();
       })
   };

   handleOpen = () => {
    this.setState({
      handleopen: true,
    });
  };

  handleClose = () => {
    this.setState({
      handleopen: false,
    });
  };

    setUsername(event: string) {
        this.setState({
            username: (event)
        })
    }
  
    setPassword(event: string) {
        this.setState({
            password: (event)
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen} id="ishButton" variant="outlined">LOGIN</Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                <DialogTitle id="dialogTitle">
                   LOGIN
                </DialogTitle>
                <DialogContent id="Login">
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    onChange={(e) => this.setUsername(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={(e) => this.setPassword(e.target.value)}
                />
                </DialogContent>
                <DialogActions id="Loginbtn">
                    <Button onClick={this.handleSubmit} id="btn">Login</Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}
    


