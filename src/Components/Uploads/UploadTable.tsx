import React, {Component} from 'react';
import { Card, CardContent, Grid, Divider, CardActions } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import IconButton from '@material-ui/core/IconButton/IconButton';
import'./Style.css';

import APIURL from '../../helpers/environment';
import mockBook from '../../Assets/unsetcover.png';
import NotesCreate from '../Notes/NotesCreate';
import RenderBook from '../Home/Renderbook';


type Props = {
    myBooks: Array<{
        id: number;
        title: string;
        author: string;
        published: string;
        bookUrl: string;
    }>,
    editUpdateBooks: (upload: any) => void,
    updateOn: () => void,
    fetchBooks: () => void,
    token: string
}

type State = {
    location: string | number,
    showToc: boolean,
}

export default class UploadTable extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            location: '',
            showToc: false,
        }

    }

    uploadDelete = (upload: any) => {
        fetch(`${APIURL}/upload/delete/${upload.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':  `${this.props.token}`
            })
        }).then(() => this.props.fetchBooks())
    }
     
    render () {
       
        return (
            <div>
            <Grid container spacing={10} style={{padding: 10}}>
            {this.props.myBooks
            ? this.props.myBooks.map((book, index) => (
                <Grid item xs={10} sm={6} lg={4} xl={4}>
                    <Card key={index} id="CardTable">
                        <CardContent><img src={mockBook} width="10%" height="100%" /></CardContent>
                        <CardContent>Title: {book.title}</CardContent>
                        <CardContent>Author: {book.author}</CardContent>
                        <CardContent>Year Published: {book.published}</CardContent>
                        <RenderBook token={this.props.token} />
                        <br />
                        <NotesCreate bookId={book.id} token={this.props.token} />
                       
                        <br/>
                        <CardActions id="cardControls">
                            <IconButton id="editBtn" onClick={() => { this.props.editUpdateBooks(book); this.props.updateOn() }}><BorderColorOutlinedIcon /></IconButton>
                            <IconButton id="deleteBtn" onClick={() => { this.uploadDelete(book)}} ><DeleteOutlineIcon /></IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                ))
                : undefined}
            </Grid>
            </div>
                
        )
    }
};



