var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {json} = require("express");

/* GET notes listing. */
router.get('/', function(req, res, next) {
  let notes = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
  res.json(JSON.parse(notes));
});

router.post('/', function(req, res, next) {
  let raw = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
  let curr = JSON.parse(raw);
  const uid = uuidv4();
  curr.push({ id: uid, title: req.body.title, text: req.body.text });

  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(curr), 'utf-8');

  res.json({ id: uid, title: req.body.title, text: req.body.text });
});

router.delete('/', function(req, res, next) {
  let id = req.query.id;
  if (!id) return res.status(400);

  let raw = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
  let curr = JSON.parse(raw);

  let noteDelete = curr.filter(note => note.id === id);
  if (!noteDelete) return res.status(404);

  let notesUpdated = curr.filter(note => note.id !== id);
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notesUpdated), 'utf-8');

  res.json(noteDelete);
});

module.exports = router;
