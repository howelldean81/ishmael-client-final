import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton/IconButton';
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
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchNotes())
    };

        render () {
            return (
                <div>
                {this.props.myNotes
                ? this.props.myNotes.map((myNotes) => (
                    <Card key={myNotes.id}>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h4">
                            Date
                        </Typography>
                        <Typography variant="body2" color="textSecondary" >
                          {myNotes.date}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h4">
                            Title
                        </Typography>
                        <Typography variant="body2" color="textSecondary">{myNotes.title}</Typography>
                        <Typography gutterBottom variant="h5" component="h4">
                            Entry
                        </Typography>
                        <Typography variant="body2" color="textSecondary">{myNotes.entry}</Typography>
                        <CardContent>
                            <IconButton onClick={() => { this.props.editUpdateNotes(myNotes); this.props.updateOn() }}><CreateIcon /></IconButton>
                            <IconButton className="delete-btn" onClick={() => { this.noteDelete(myNotes)}} ><ClearIcon /></IconButton>
                        </CardContent>
                        </CardContent>
                    </Card>
                ))
                : undefined} 
                </div>  
            )
        }
}

