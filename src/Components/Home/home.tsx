import React from 'react';


import AppBar from './AppBar';
import UploadIndex from '../Uploads/UploadIndex';
import NotesIndex from '../Notes/NotesIndex';

import './Home.css';

import Renderbook from '../../Components/Home/Renderbook';
// import mockBook from '../../Assets/unsetcover.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

interface Props {
    updateToken: (newToken: string) => void;
    clearToken: () => void;
    token: string,
}

type State = {
    allBooks: Array<{
        id: number;
        title: string;
        author: string;
        published: string;
        bookUrl: string;
        userId: number;
    }>,
    handleopen: boolean,
    BookCreate: any,
    fetchBooks: any,
}

export default class BookIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allBooks: [],
            handleopen: false,
            BookCreate: {},
            fetchBooks: '',
        }
    }

    // fetchUpload = () => {
    //     fetch(`${APIURL}/upload/`, {
    //         method: 'GET',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({
    //                 allBooks: data
    //             })
    //             console.log("response", data);
    //         })
    // }

    // componentDidMount() {
    //     this.fetchUpload();
    //     console.log('props: ', this.props)
    //     console.log('state: ', this.state)
    // }

    // handleOpen = () => {
    //     this.setState({
    //         handleopen: true,
    //     });
    // };

    // handleClose = () => {
    //     this.setState({
    //         handleopen: false,
    //     });
    // };

    render() {
        return (
            <React.Fragment>
                        <AppBar clickLogout={this.props.clearToken} updateToken={this.props.updateToken} token={this.props.token} />
                <div>
                <Link to="/notes" className="site-link">Notes</Link>
              <Link to="/upload" className="site-link">Uploads</Link>
              <Link to="/render" className="site-link">Render</Link>
                </div>
                <Router>
                    <Switch>
                        <Route exact path="/notes" ><NotesIndex token={this.props.token} /></Route>
                        <Route exact path="/upload"><UploadIndex token={this.props.token} /></Route>
                        <Route exact path="/render" ><Renderbook token={this.props.token} /></Route>
                    </Switch>
                </Router>
            </React.Fragment>
                
        )
    }
}