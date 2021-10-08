import React from 'react';
import {
    Button,
   DialogTitle,
    Box,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    
    Grid,
   
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import './Style.css';
import APIURL from '../../helpers/environment';


interface Props {
    token: string
    fetchBooks: () => void,
    BookCreate: any,
    createOff: () => void,
}

type State = {
    title: string;
    author: string;
    published: string;
    file: string;
    handleopen: boolean;
}

export default class BookCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: "",
            author: "",
            published: "",
            file: "",
            handleopen: false,
        }
    }

    handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const bookData = new FormData();
        bookData.append('book', this.state.file)
        bookData.append('title', this.state.title)
        bookData.append('author', this.state.author)
        bookData.append('published', this.state.published)
        fetch(`${APIURL}/upload/create`, {
            method: 'POST',
            body: bookData, 
            headers: new Headers({
                // 'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        })
            .then(res => res.json())
            .then((bookData) => {
                this.setState({
                    title: '',
                    author: '',
                    published: '',
                })
                console.log(bookData)
                this.props.fetchBooks();
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

    setTitle(event: string) {
        this.setState({
            title: (event)
        })
    }

    setAuthor(event: string) {
        this.setState({
            author: (event)
        })
    }

    setPublished(event: string) {
        this.setState({
            published: (event)
        })
    }
    
    singleFileChangedHandler = (event: any) => {
        this.setState({
            file: event.target.files[0]
        });
    }
    
    render() {
        return (
            <div>
                <Grid container justifyContent="center" style={{padding: 150}}>
                    <Button onClick={this.handleOpen} id="uploadBtn" variant="outlined">Upload</Button>
                </Grid>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogContent id="uploads">
                        <DialogTitle id="dialogTitle"><strong>Book Details</strong></DialogTitle>
                        
                            <TextField
                                autoFocus
                                margin="dense"
                                name="title"
                                label="Title"
                                fullWidth
                                onChange={(e) => this.setTitle(e.target.value)}
                                />
                       
                            <TextField
                                autoFocus
                                margin="dense"
                                name="author"
                                label="Author"
                                fullWidth
                                onChange={(e) => this.setAuthor(e.target.value)}>
                            </TextField>
                       
                         
                            <TextField
                                autoFocus
                                margin="dense"
                                name="published"
                                label="Published Date"
                                fullWidth
                                onChange={(e) => this.setPublished(e.target.value)}
                            />
                        
                        <input
                            accept="books/*"
                            className="inputBook"
                            id="contained-button-file"
                            type="file"
                            onChange={this.singleFileChangedHandler}
                            />
                    </DialogContent>
                    <DialogActions id="btns">
                        <Box justifyContent="center">
                            <Button onClick={this.handleClose} className="createBookBtn">
                                <SkipPreviousIcon id="backIcon" />{" "}{" "}Back</Button>
                            <Button type="submit" className="createBook" id="ishButton"onClick={this.handleSubmit} ><strong>Upload</strong></Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            
        </div>
            
        )
    }
}






