import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton/IconButton';
import APIURL from '../../helpers/environment';

type Props = {
    fetchNotes: () => void,
    updateOff: () => void,
    token: string,
    notesUpdate: any,
}

type State = {
    date: string;
    title: string;
    entry: string;
    handleopen: boolean,

}

export default class NotesEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            date: this.props.notesUpdate.date,
            title: this.props.notesUpdate.title,
            entry: this.props.notesUpdate.entry,
            handleopen: false,

        }
    }

    handleUpdate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/notes/${this.props.notesUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({ date: this.state.date, title: this.state.title, entry: this.state.entry, }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            })
        })
            .then(() => {
                this.props.fetchNotes();
                this.props.updateOff();

            })
    };

    closeUpdate = () => {
        this.props.updateOff();
    }

    handleOpen = () => {
        this.setState({
            handleopen: true,
        });
    }

    handleClose = () => {
        this.setState({
            handleopen: false,
        })
    }

    render() {
        return (
            <div className="editContainer">
                <Dialog open={true} onClose={this.closeUpdate}>
                    <DialogTitle id="dialogTitle">Update Note<IconButton className="exit-btn-post-edit" onClick={this.closeUpdate}><ClearIcon /></IconButton></DialogTitle>
                    <DialogContent id="Edit" >
                        
                        <TextField
                            margin="dense"
                            label="edit date"
                            type="text"
                            fullWidth
                            value={this.state.date}
                            onChange={(event) => this.setState({date: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="edit title"
                            type="text"
                            fullWidth
                            value={this.state.title}
                            onChange={(event) => this.setState({title: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="edit entry"
                            type="text"
                            fullWidth
                            value={this.state.entry}
                            onChange={(event) => this.setState({entry: event.target.value})}
                        />
                            <Button type="submit" id="btn" onClick={this.handleUpdate}>Update</Button>
                    </DialogContent>
                        <DialogActions id="Createbtn">
                        </DialogActions>
                </Dialog>
            </div>
        )
    }
}