import React from 'react';
import CommentCreate from './NotesCreate';
import CommentEdit from './NotesEdit';
import CommentTable from './NotesTable';
import Grid from '@material-ui/core/Grid';
import APIURL from '../../helpers/environment';

type Props = {
    token: string;
    // updateToken: (newToken: string) => void,
    // clearToken: () => void,
}

type State = {
    myNotes: any,
    notesUpdate: any,
    updateActive: boolean,

}

export default class NotesIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            myNotes: [],
            notesUpdate: {},
            updateActive: false,
        }
          
    }

    fetchNotes = () => {
        console.log(this.props.token);
        fetch(`${APIURL}/notes/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        })
            .then((res) => res.json())
            .then((bookData) => {
                this.setState({
                    myNotes: bookData
                })
                console.log("Notes", this.state.myNotes)
            })
    }

    componentDidMount() {
        this.fetchNotes()
    }

    editUpdateNotes = (notes: any) => {
        this.setState({
            notesUpdate: notes
        })
    }

    editCreateNotes = (notes: any) => {
        this.setState({
            notesUpdate: notes
        })
    }

    updateOn = () => {
        this.setState({
            updateActive: true
        })
    }

    updateOff = () => {
        this.setState({
            updateActive: false
        })
    }

    render() {
        return (
            <div className="Container">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            {/* <CommentCreate
                                fetchComments={this.fetchComments.bind(this)}
                                token={this.props.token}
                                // updateToken={this.props.updateToken}
                                // clearToken={this.props.clearToken}
                            
                            /> : <> </> */}
                            <CommentTable
                                myNotes={this.state.myNotes}
                                editUpdateNotes={this.editUpdateNotes.bind(this)}
                                updateOn={this.updateOn.bind(this)}
                                fetchNotes={this.fetchNotes.bind(this)}
                                token={this.props.token}
                        />
                        {this.state.updateActive ?
                            <CommentEdit
                                notesUpdate={this.state.notesUpdate}
                                updateOff={this.updateOff.bind(this)}
                                token={this.props.token}
                                fetchNotes={this.fetchNotes.bind(this)}
                            />
                            : <></>}
                    </Grid>
                </Grid>
            </div>


        )
    }
}