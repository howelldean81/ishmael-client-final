import React, {Component} from 'react'
import {ReactReader} from 'react-reader'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle,
  Typography,
  Toolbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import APIURL from '../../helpers/environment';
import './Home.css'


interface Props {
    token: string,
}

type State = {
    myBooks: Array<{
      id: number;
      title: string;
      author: string;
      published: string;
      bookUrl: string;
    }>,
    handleOpen : boolean
}


class RenderBook extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            myBooks: [],
            handleOpen: false
        }
    }

    componentDidMount() {
      this.renderBook();
    }

    renderBook = () => {
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
                  myBooks: bookData,
              })
              console.log("Books", this.state.myBooks)
            })
           
    }

    handleOpen = () => {
        this.setState({
            handleOpen: false
        })
    }
    handleClose = () => {
        this.setState({
            handleOpen: true
        })
    }

    // render () {
    //   return (
    //     <div className="renderBook">
              
                
    //                 {this.state.myBooks.filter(myBooks => {
    //                   return (
    //                     <div key={myBooks.id} >
    //                       <Typography variant="h6" id="reviewTitle"><strong>{myBooks.title}</strong></Typography>
    //                       <ReactReader
    //                         url={myBooks.bookUrl}
    //                         location={'epubcfi(/6/2[cover]!/6)'}
    //                         locationChanged={(epubcifi) => console.log(epubcifi)} />
    //                     </div>
    //                   )
    //                 })},

                    
    //     </div>
    //   )
    // }
  render () {
    let thisBook = ('https://mrbearnewbucket.s3.us-east-2.amazonaws.com/1633202214242-Greatgatsby.epub')

    return (
      <div style={{position: 'absolute', height: '100%', width: '100%'}}> 
          <Button onClick={this.handleOpen} id="ishButton" variant="outlined">Test Render</Button>
        <ReactReader
          url={thisBook}
            title={'The Great Gatsby'}
          location={'epubcfi(/6/2[cover]!/6)'}
          locationChanged={(epubcifi) => console.log(epubcifi)}
        />
      </div>
    )
  }
}

export default RenderBook;