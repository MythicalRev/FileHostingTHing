// Values
const express = require("express");
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const multer = require('multer')
const fs = require('fs')
const http = require('http')

const db = new sqlite3.Database('./files.db');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      // Create a user-specific upload folder if it doesn't exist
      const userFolder = `public/uploads`;
      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
      }
      cb(null, userFolder);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// You Can Add async By removing the /* And */
// You Can Change The / Its For {Link}/ Example {Link}/replit
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/dl', (req, res) => {
  const query = req.query.fileDir;

  const fileDir = `public/uploads/${query}`

  res.render('dl', {fileName: query});
});

app.post('/dl', (req, res) => {
  const query = req.query.fileName;

  const fileDir = `public/uploads/${query}`

  res.download(fileDir, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });

  //res.redirect(`/dl?fileDir=${fileName}`)
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.get('/confirmed', (req, res) => {
  const query = req.query.fileDir
  res.render('confirmed', { filePath: query });
})

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = `${req.file.filename}`;

  console.log(filePath);

  db.run("INSERT INTO files (filePath) VALUES (?)",
        [filePath], 
        function(err) {
            if (err) {
                console.error('Error saving post:', err.message); // Log detailed error
                return res.status(500).send('Error saving post');
            }

            console.log('Post registered successfully with ID:', this.lastID);

            res.redirect(`/confirmed?fileDir=${filePath}`);
        });
});

// Dont Remove
app.listen(3000, () => {
  console.log("Project is ready!");
});