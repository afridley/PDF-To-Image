
        <aside className="mBelow">
        <h2>Accepted</h2>
        <ul>
        {/* Grabs Accepted Files Name and Size and displays it */}
        {
            this.state.acceptedFiles.map(f => <li key={f.file.name}>{f.file.name} - {f.file.size} bytes</li>)
        }
        </ul>
        <h2>Rejected</h2>
        <ul>
        {
            this.state.rejectedFiles.map(f => <li key={f.file.name}>{f.file.name} - {f.file.size} bytes</li>)
        }
        </ul>
        </aside>
        
 // onDrop={
            // (accepted, rejected) => { this.setState({ accepted, rejected }); 
            //   gm('/home/x2/image/img.jpg')
            //     .stream('png', function (err, stdout, stderr) {
            //     var writeStream = fs.createWriteStream('/home/x2/image/img.png');
            //     stdout.pipe(writeStream);
            //     if (err) {
            //       console.log('well shit')
            //     }
            //   });
            // }}

            // figure out where the ondrop method needs to go