const socket = io("/");

function addToChat(message) {
    const chat = document.getElementById('chat')
    chat.innerHTML += `<img src=${message} width:"20%" style="object-fit:contain"></img>`
  }

socket.on('message', addToChat)

const onChange = (event) => {
    const value = event.target.value;
  
    // this will return C:\fakepath\somefile.ext
    console.log(value);
  
    const files = event.target.files;
  
    //this will return an ARRAY of File object
    console.log(files);
  }
  

document.getElementById('send').addEventListener('click', () => {
    const text = document.getElementById('text');
    var path = (window.URL || window.webkitURL).createObjectURL(text.files[0]);
// document.write('<img src="' + path + '" width="250" height="250" />');
    console.log(path)
    addToChat(path)
    socket.emit('message', path)
    text.value = ''
  })