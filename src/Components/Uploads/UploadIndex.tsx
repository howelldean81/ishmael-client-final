import React from 'react';
import UploadPost from './UploadPost';
import UploadEdit from './UploadEdit';
import UploadTable from './UploadTable';
import Grid from '@material-ui/core/Grid';
import './Style.css';
import APIURL from '../../helpers/environment';


type Props = {
    token: string;
}

type State = {
    myBooks: any,
    bookUpdate: any,
    BookCreate: any,
    updateActive: boolean,
    BookCreateActive: boolean,
    handleOpen: boolean,
}


export default class BookIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            myBooks: [],
            bookUpdate: {},
            BookCreate: {},
            updateActive: false,
            BookCreateActive: false,
            handleOpen: false,
           
        }
    }

    fetchBooks = () => {
        fetch(`${APIURL}/upload/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`

            })
        })
            .then((res) => res.json())
            .then((bookData) => {
                this.setState({
                    myBooks: bookData
                })
                console.log("Books", this.state.myBooks)
                this.handleClose();
            })
    }

    componentDidMount() {
        this.fetchBooks()
    }

    editUpdateBooks = (upload: any) => {
        this.setState({
            bookUpdate: upload
        })
    }

    editCreateSubmits = (upload: any) => {
        this.setState({
            bookUpdate: upload
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

    createOff = () => {
        this.setState({
            BookCreateActive: false
        })
    }

    createOn = () => {
        this.setState({
            BookCreateActive: true
        })
    }

    handleOpen = () => {
        this.setState({
            handleOpen: true
        })
    }
    handleClose = () => {
        this.setState({
            handleOpen: false
        })
    }


    render() {
        return (
            <div className="Container">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <UploadPost
                                fetchBooks={this.fetchBooks.bind(this)}
                                BookCreate={this.state.BookCreate}
                                token={this.props.token}
                                createOff={this.createOff.bind(this)}
                            /> 
                            <UploadTable
                                myBooks={this.state.myBooks}
                                editUpdateBooks={this.editUpdateBooks.bind(this)}
                                updateOn={this.updateOn.bind(this)}
                                fetchBooks={this.fetchBooks.bind(this)}
                                token={this.props.token}
                        />
                        {this.state.updateActive ?
                            <UploadEdit
                                bookUpdate={this.state.bookUpdate}
                                updateOff={this.updateOff.bind(this)}
                                token={this.props.token}
                                fetchBooks={this.fetchBooks.bind(this)}
                            />
                            : <></>}
                    </Grid>
                </Grid>
            </div>
        )
    };
}