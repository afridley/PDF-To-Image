import {remote} from 'electron';

function minimize(){
    var window = remote.getCurrentWindow();
    window.minimize();  
  }

  function close(){
    var window = remote.getCurrentWindow();
    window.close();  
  }

  module.exports = {
      minimize,
      close
  }