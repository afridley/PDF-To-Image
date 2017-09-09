import React from 'react';;
import Dropzone from 'react-dropzone';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
var fs = require('fs');
var gm = require('gm');
var imageMagick = gm.subClass({ imageMagick: true });
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});
export default class App extends React.Component {
    constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  render() {
    return (
      <section>
        <div className="container">
          <Dropzone
          
            className="dropzone"
            accept="image/jpeg"
            onDrop={
            (accepted, rejected) => { this.setState({ accepted, rejected }); 
              gm('/home/x2/image/img.jpg')
                .stream('png', function (err, stdout, stderr) {
                var writeStream = fs.createWriteStream('/home/x2/image/img.png');
                stdout.pipe(writeStream);
                if (err) {
                  console.log('well shit')
                }
              });
            }}
          >
           <div className="item">Drop PDF's</div> 
          </Dropzone>
        </div>
        <div className="bContainer">
          {/* Custom Button Theme */}
         <MuiThemeProvider theme={theme}>
            <Button>{'Convert'}</Button>
         </MuiThemeProvider>
        </div>
        <aside className="mBelow">
          <h2>Accepted</h2>
          <ul>
            {/* Grabs Accepted Files Name and Size and displays it */}
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h2>Rejected</h2>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}
