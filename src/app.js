import React from 'react';
import Dropzone from 'react-dropzone';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import{
  close,
  minimize
} from '../src/utils/functions';

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
      rejectedFiles: []
    }
  }

onDrop(acceptedFiles, rejectedFiles) {
  acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
          const fileAsBinaryString = reader.result;
          // do whatever you want with the file content
          gm(file.path)
    .stream('png', function (err, stdout, stderr) {
    var writeStream = fs.createWriteStream(file.path + ".png");
    stdout.pipe(writeStream);
    if (err) {
      console.log('well shit')
    }
    console.log(file.path);
  });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

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
          >
           <div className="item">Drop PDF's</div> 
          </Dropzone>
        <div className="bContainer">
          {/* Custom Button Theme */}
         <MuiThemeProvider theme={theme}>
            <Button>{'Tutorial'}</Button>
         </MuiThemeProvider>
        </div>
      </section>
    );
  }
}
