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
    Typography,
} from '@material-ui/core';
import './notesStyle.css';
import '../Home/Home.css'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import APIURL from '../../helpers/environment';

interface Props {
    token: string,
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
                'Authorization': this.props.token
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
            <div className="main">
                    <Button onClick={this.handleOpen} id="ishButton" variant="outlined">Notes</Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogContent id="notes">
                        <Typography variant="h6" id="dialogTitle"><strong>Notes</strong></Typography>
                        <FormGroup>
                            <InputLabel htmlFor="date" id="dateLabel">Date</InputLabel>
                            <TextField
                                label="Date"
                                id="dateInput"
                                type="date"
                                variant="outlined"
                                defaultValue="01/13/2021"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => this.setDate(e.target.value)}
                            >Date</TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel htmlFor="title" id="titleLabel">Title</InputLabel>
                            <TextField
                                label="Title"
                                name={this.state.title}
                                variant="outlined"
                                id="titleInput"
                                onChange={(e) => this.setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <InputLabel htmlFor="entry" id="entryLabel">Entry</InputLabel>
                            <TextField
                                label="Entry"
                                name={this.state.entry}
                                multiline rowsMax={6}
                                variant="outlined"
                                id="entryInput"
                                onChange={(e) => this.setEntry(e.target.value)}
                            />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions id="notesBtn">
                        <Box justifyContent="center">
                            <Button onClick={this.handleOpen} className="createNotes">
                                <SkipPreviousIcon id="backIcon" />{" "}{" "}Back</Button>
                            <Button type="submit" className="createNotesbtn" id="submitButton"onClick={this.handleSubmit} ><strong>Add Note</strong></Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}