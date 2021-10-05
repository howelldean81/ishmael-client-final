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
    Grid,
    AppBar,
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import './Style.css';
import APIURL from '../../helpers/environment';

interface Props {
    token: string,
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
                'Authorization': this.props.token
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
            <div className="main">
                <Grid container spacing={2} style={{padding: 2}}>
                    <Grid item xs={12} sm={6} lg={4} xl={12}>
                        <Button onClick={this.handleOpen} id="ishButton" variant="outlined">Upload</Button>
                    </Grid>
                </Grid>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogContent id="uploads">
                        <Typography variant="h6" id="dialogTitle"><strong>Book Details</strong></Typography>
                        <FormGroup>
                            <InputLabel htmlFor="Title" id="titleLabel">Title</InputLabel>
                            <TextField
                                id="titleInput"
                                name="title"
                                value={this.state.title}
                                variant="outlined"
                                onChange={(e) => this.setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <InputLabel htmlFor="author" id="authorLabel">Author</InputLabel>
                            <TextField
                                id="authorInput"
                                name="author"
                                value={this.state.author}
                                onChange={(e) => this.setAuthor(e.target.value)}
                            >Date</TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel htmlFor="published" id="publishedLabel">Published</InputLabel>
                            <TextField
                                value={this.state.published}
                                name="published"
                                id="publishedInput"
                                onChange={(e) => this.setPublished(e.target.value)}
                            />
                        </FormGroup>
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
            </div >
            
        )
    }
}






