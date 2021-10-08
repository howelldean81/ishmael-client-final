import React from 'react';
import {
    Button,
    FormGroup,
    InputLabel,
    Box,
    TextField,
    Dialog,
    DialogContent,
   DialogActions,
    DialogTitle,
    Grid,
} from '@material-ui/core';
import './notesStyle.css';
import '../Home/Home.css'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import APIURL from '../../helpers/environment';

interface Props {
    token: string
    bookId: number
}

type State = {
    date: string;
    title: string;
    entry: string;
    bookId: number;
    handleopen: boolean;
}

export default class NotesCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            date: "",
            title: "",
            entry: "",
            bookId: 0,
            handleopen: false,
        }
    }

    handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        fetch(`${APIURL}/notes/create/${this.props.bookId}`, {
            method: 'POST',
            body: JSON.stringify({
                date: this.state.date,
                title: this.state.title,
                entry: this.state.entry,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':  `${this.props.token}`
            })
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                date: '',
                title: '',
                entry: '',
            })
            console.log(data)
            this.handleClose();
        });
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


    setDate(event: string) {
        this.setState({
            date: (event)
        })
    }

    setTitle(event: string) {
        this.setState({
            title: (event)
        })
    }
    setEntry(event: string) {
        this.setState({
            entry: (event)
        })
    }


    render() {
        return (
            <div>
        
                    <Grid container justifyContent="center" >
                        <Button onClick={this.handleOpen} id="ishButton" variant="outlined">Add Note</Button>
                    </Grid>
                   
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogContent id="notes">
                        <DialogTitle id="dialogTitle"><strong>Notes</strong></DialogTitle>
                        
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Date"
                                name="date"
                                type="text"
                                fullWidth
                                onChange={(e) => this.setDate(e.target.value)}
                                />
                        
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Title"
                                name="title"
                                type="text"
                                fullWidth
                                onChange={(e) => this.setTitle(e.target.value)}>
                            </TextField>
                       
                           
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Entry"
                                name="entry"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => this.setEntry(e.target.value)}
                            />
                       
                        
                    </DialogContent>
                    <DialogActions id="btns">
                        <Box justifyContent="center">
                            <Button onClick={this.handleClose} className="createBookBtn">
                                <SkipPreviousIcon id="backIcon" />{" "}{" "}Back</Button>
                            <Button type="submit" className="createBook" id="ishButton"onClick={this.handleSubmit} ><strong>Submit</strong></Button>
                        </Box>
                    </DialogActions>
                </Dialog>
           
            
            </div >
        )
    }
}