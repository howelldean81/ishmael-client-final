import React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton/IconButton';
import '../Uploads/Style.css';
import APIURL from '../../helpers/environment';

type Props = {
    myNotes: Array<{
        id: number;
        date: string;
        title: string;
        entry: string;
        userId: number;
    }>,
    editUpdateNotes: (submission: any) => void,
    updateOn: () => void,
    fetchNotes: () => void,
    token: string
}

export default class notesTable extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

   noteDelete = (notes: any) => {
        fetch(`${APIURL}/notes/${notes.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':  `${this.props.token}`
            })
        }).then(() => this.props.fetchNotes())
    };

        render () {
            return (
                <div>
                    <Grid container spacing={10} style={{padding: 24}}>
                        {this.props.myNotes
                        ? this.props.myNotes.map((myNotes) => (
                            <Grid item xs={12} sm={6} lg={4} xl={4}>
                                <Card key={myNotes.id} id="CardTable">
                                    <CardContent>Date:{myNotes.date}</CardContent>
                                    <CardContent>Title:{myNotes.title}</CardContent>
                                    <CardContent>Entry:{myNotes.entry}</CardContent>
                                    <CardContent>
                                        <IconButton id="editBtn" onClick={() => { this.props.editUpdateNotes(myNotes); this.props.updateOn() }}><CreateIcon /></IconButton>
                                        <IconButton id="deleteBtn" onClick={() => { this.noteDelete(myNotes)}} ><ClearIcon /></IconButton>
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

