import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton/IconButton';
import APIURL from '../../helpers/environment';

type Props = {
    fetchBooks: () => void,
    updateOff: () => void,
    token: string,
    bookUpdate: any,
}

type State = {
    title: string;
    author: string;
    published: string;
    file: string;
    handleopen: boolean,
    
}


export default class BookEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: this.props.bookUpdate.title,
            author: this.props.bookUpdate.author,
            published: this.props.bookUpdate.published,
            file: this.props.bookUpdate.file,
            handleopen: false,
        }
    }

    handleUpdate = (event: React.SyntheticEvent) => {
        event.preventDefault();
        fetch(`${APIURL}/upload/update/${this.props.bookUpdate.id}`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }),
            body: JSON.stringify({title: this.state.title, author: this.state.author, published: this.state.published, file: this.state.file})
        }) .then(() => {
            this.props.updateOff();
            this.props.fetchBooks();
            
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

    singleFileChangedHandler = (event: any) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    
    render() {
        return (    
            <div className="editContainer">
                <Dialog 
                open={true} >
                    <DialogTitle id="dialogTitle">Update Book<IconButton className="exit-btn-post-edit" onClick={this.closeUpdate}><ClearIcon /></IconButton></DialogTitle>
                    <DialogContent id="Edit" >
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
                            label="edit author"
                            type="text"
                            fullWidth
                            value={this.state.author}
                            onChange={(event) => this.setState({author: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="edit published"
                            type="text"
                            fullWidth
                            value={this.state.published}
                            onChange={(event) => {this.setState({published: event.target.value})}}
                        />
                        <input
                            accept="book/*"
                            id="contained-button-file"
                            type="file"
                            onChange={this.singleFileChangedHandler}
                        />
                    </DialogContent>
                        <Button type="submit" id="btn" onClick={this.handleUpdate} >Update</Button>
                </Dialog>
            </div>
        )
    }
}