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

function addNote(body, noteArray) {
    const newNote = body;

    if(!Array.isArray(noteArray))
    noteArray = [];

    if(noteArray.length === 0)
    noteArray.push(0);

    body.id = noteArray[0];
    noteArray[0]++;

    noteArray.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify(noteArray, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = addNote(req.body, notesFile);
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}!`);
});