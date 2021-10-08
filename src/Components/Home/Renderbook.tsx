import React, {Component} from 'react'
import {ReactReader} from 'react-reader'
import {
  Dialog,
  DialogContent,
  Button,
  Grid,
  Container,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import APIURL from '../../helpers/environment';
import './Home.css'
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Rendition } from 'epubjs';


interface Props {
    token: string,
    getRendition? (rendition: Rendition): void;
    
}

interface State {
  myBooks: Array<{
    id: number;
    title: string;
    author: string;
    published: string;
    bookUrl: string;
}>,
  open : boolean,
  bookUrl: string,
  location: any;
  showToc: boolean,

}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const storage = global.localStorage || null

class RenderBook extends Component<Props, State> {
  rendition: any;
    constructor(props: Props) {
      super(props)
        this.state = {
          myBooks: [],
          bookUrl: '',
          location: storage && storage.getItem('epub-location') ? storage.getItem('epub-location') : 2,
          showToc: false,
          open: false,
        }
    }

   

   componentDidMount() {
      fetch(`${APIURL}/upload/mine`, {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem("token")}`
          })
      })
          .then((res) => res.json())
          .then((myBooks) => {
              this.setState({
                myBooks: myBooks
              });
              
              console.log("Render", this.state.myBooks)
            });
    }
    
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    // showToc = () => {
    //   this.setState({
    //     showToc: false
    //   })
    // }

    locationChanged = (location: any) => {
      this.setState(
        {
          location
        },
        () => {
          storage && storage.setItem('epub-location', location)
        }
      )
    }

    getRendition = (rendition: any) => {
      console.log('getRendition callback', rendition)
      this.rendition = rendition
    }

    render () {
        return (
          <div>
            <Grid container justifyContent="center" >
                        <Button onClick={this.handleClickOpen} id="ishButton" variant="outlined">Read</Button>
                    </Grid>
                    
                    <Dialog 
                    fullScreen open={this.state.open} onClose={this.handleClose}
                    TransitionComponent={Transition} >
                      <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
                      <DialogContent>
                      {this.state.myBooks.map((item, index) => {
                          return (
                  <React.Fragment key={index}>
                   
                    <ReactReader
                        url={item.bookUrl}
                        location={'epubcfi(/6/2[cover]!/6)'}
                        locationChanged={(epubcifi) => console.log(epubcifi)}
                        getRendition={this.getRendition}
                       ></ReactReader>
                      
                  </React.Fragment>


                  )
                })}
              
        </DialogContent>
        </Dialog>
          </div>
        )
      
    }
  };
        
   
  // render () {
  //   let thisBook = ('https://mrbearnewbucket.s3.us-east-2.amazonaws.com/1633202214242-Greatgatsby.epub')

  //   return (
  //     <div style={{position: 'absolute', height: '100%', width: '100%'}}> 
  //         <Button onClick={this.handleOpen} id="ishButton" variant="outlined">Test Render</Button>
  //       <ReactReader
  //         url={thisBook}
  //           title={'The Great Gatsby'}
  //         location={'epubcfi(/6/2[cover]!/6)'}
  //         locationChanged={(epubcifi) => console.log(epubcifi)}
  //       />
  //     </div>
  //   )
  // }


export default RenderBook;


