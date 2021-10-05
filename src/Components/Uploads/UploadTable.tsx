import React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import IconButton from '@material-ui/core/IconButton/IconButton';
import'./Style.css';
import APIURL from '../../helpers/environment';
import mockBook from '../../Assets/unsetcover.png';
import NotesCreate from '../Notes/NotesCreate';

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
    dialogActive: boolean,
}

export default class UploadTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogActive: false,
        }

    }

    uploadDelete = (upload: any) => {
        fetch(`${APIURL}/upload/delete/${upload.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchBooks())
    }

    render () {
        return (
            <div>
            <Grid container spacing={10} style={{padding: 24}}>
            {this.props.myBooks
            ? this.props.myBooks.map((myBooks) => (
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                    <Card key={myBooks.id} id="CardTable">
                        <CardContent><img src={mockBook} width="10%" height="100%" /></CardContent>
                        <CardContent>Title: {myBooks.title}</CardContent>
                        <CardContent>Author: {myBooks.author}</CardContent>
                        <CardContent>Year Published: {myBooks.published}</CardContent>
                        <NotesCreate bookId={myBooks.id} token={this.props.token} />
                        <CardContent>
                            <IconButton id="editBtn" onClick={() => { this.props.editUpdateBooks(myBooks); this.props.updateOn() }}><BorderColorOutlinedIcon /></IconButton>
                            <IconButton id="deleteBtn" onClick={() => { this.uploadDelete(myBooks)}} ><DeleteOutlineIcon /></IconButton>
                            <hr />
                        </CardContent>
                    </Card>
                </Grid>
                ))
                : undefined}
            </Grid>
            </div>
                
        )
    }
}


