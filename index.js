// Values
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const bcrypt = require('bcryptjs');
const multer = require('multer')

const db = new sqlite3.Database('./users.db');

const upload = multer({ dest: 'uploads/' })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// You Can Add async By removing the /* And */
// You Can Change The / Its For {Link}/ Example {Link}/replit
app.get('/', (req, res) => {
  res.render('home');
});

// Dont Remove
app.listen(3000, () => {
  console.log("Project is ready!");
});