const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/videos', (req, res) => {
  res.sendFile(__dirname + '/' + req.query.url)
})

app.get('/favicon', (req, res) => {
  res.sendFile(__dirname + '/favicon.ico')
})

app.get('/style', (req, res) => {
  res.sendFile(__dirname + '/style.scss')
});

app.get('/download', (req, res) => {
try {
const link = req.query.url
const ytdownload = require("ytdownload");
 
ytdownload(link)
.then(VideoPath => {
    console.log(VideoPath);
    res.send(`<html>
<head>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="/style">
  <title>Download.it | Best Youtube MP4 Converter</title>
</head>
<body>
<h1>Download.it</h1><hr><nav><div class="theme-switch-wrapper"><em><b><span>Dark Mode</b></span></em><span> </span><label class="theme-switch" for="checkbox"><input type="checkbox" id="checkbox" /><div class="slider round"></div></label>
  </div></nav>
<section><h1>Converted sucessfully!</h1><button onclick="window.location.assign('/videos/?url=${VideoPath}')">Preview/Download MP4</a><script>
const input = document.getElementById('url')

input.value = ''
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('emoji').value = "☀"
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('emoji').value = "🌙"
          localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
  </script>
  </section>
  </body>
  </html>`)
});
} catch(err) {
  res.send(err)
  }
});

app.listen(3000, () => {
  console.log('server started');
});