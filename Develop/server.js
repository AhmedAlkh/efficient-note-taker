const express = require('express');
const fs = require('fs');
const path = require('path');
const notesFile = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware (directory public)
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(notesFile.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// links to file apiRoutes in routes folder
// app.use('/api', apiRoutes);
// links to file htmlRoutes in routes folder
// app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});