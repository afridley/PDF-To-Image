import React from 'react';
import Dropzone from 'react-dropzone'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {
    return (
      <section>
        <div className="container">
          <Dropzone 
          className="dropzone"
          accept="application/pdf"
          style={{}}
          onDrop={this.onDrop.bind(this)}> 
         <div className="item">Drop PDF's Here</div>          
          </Dropzone>
        </div>
        <aside className="mBelow">
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}
