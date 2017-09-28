import React from 'react';
import Dropzone from 'react-dropzone';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import{
  close,
  minimize
} from '../src/utils/functions';
import Modal from '../src/components/modal';

var fs = require('fs');
var gm = require('gm');
var imageMagick = gm.subClass({ imageMagick: true });
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, rgba(3, 72, 105, .4) 30%, rgba(33, 72, 105, .4) 90%)',
//        background: 'rgba(33, 72, 105, 1)',   
        borderRadius: 2,
        border: 0,
        color: 'rgba(255,255,255,.5)',
        height: 20,
        padding: '0 30px',
        margin: '1em',
      },
    },
  },
});


export default class App extends React.Component {
    constructor() {
    super()
    this.state = {
      acceptedFiles: [],
      rejectedFiles: [],
      modalActive:false
    }
  }

  openModal(){
  this.setState({modalActive:true})
}
  closeModal(){
  this.setState({modalActive:false})
}

onDrop(acceptedFiles, rejectedFiles) {
  acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
          const fileAsBinaryString = reader.result;
          // do whatever you want with the file content
          gm(file.path)
    .stream('png', function (err, stdout, stderr) {
    var writeStream = fs.createWriteStream(file.path.replace(/\.[^/.]+$/, "") + ".png");
    stdout.pipe(writeStream);
    if (err) {
      console.log('Error')
    }
    
  });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      console.log(rejectedFiles);
      reader.readAsBinaryString(file);
  });
}

  render() {
    return (
      <section>
        <div className="title-bar">
        <button className="close title-button" onClick={() => close()}></button>
        <button className="minimize title-button" onClick={() => minimize()}></button>
        </div>
          <Dropzone          
            className="dropzone"
            accept="application/pdf"
            onDrop={this.onDrop.bind(this)}
            activeClassName="d-active"
            acceptClassName="d-accept"
            rejectClassName="d-reject"   
          >
           <div className="item">Drop PDF's 
           </div> 
          </Dropzone>
        <div className="bContainer">
          {/* Custom Button Theme */}
         <MuiThemeProvider theme={theme}>
            <Button onClick={() => this.openModal()}>{'Tutorial'}</Button>
            </MuiThemeProvider> 
        </div>
        <div>
          <Modal isOpen = {this.state.modalActive} onClose = {() => this.closeModal()}> 
            <div className="modal-text">  
            <h1>Tutorial</h1>
            <p>This program requires Graphics Magick to be installed. Please see below for instructions</p>

          <h3>Linux</h3>
          <p>Graphics Magick may already be installed.
            <p>Open terminal.</p>
            <p><code>sudo apt-get install graphicsmagick</code></p>
          </p>

          <h3>Windows</h3>
          <p>Download the latest version from.</p>
          <p><a href="ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/windows/">ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/windows/</a></p>

          <h3>Mac</h3>
          <p>Open terminal (cmd + space) </p>
          <p><code>brew install graphicsmagick</code></p>

          <h3>How To Use</h3>
          <p>Drag your .pdf files onto the drop area this will convert them to .png files in the same folder that they where dragged from.</p>

         <MuiThemeProvider theme={theme}>
            <Button onClick={() => this.closeModal()}>{'Close'}</Button>
            </MuiThemeProvider> 
            </div>
          </Modal>  
        </div>  
      </section>
    );
  }
}
