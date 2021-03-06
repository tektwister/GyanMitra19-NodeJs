const express = require('express');
const router = express.Router();
const config = require('../config/env');
const College = require('../models/college');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newCollege = new College({
        name: req.body.name,
        locale: req.body.locale
    });
    newCollege.save((err, doc) => {
        if (err) {
            res.json({ error: false, msg: 'Failed to Create College' + err });
        } else {
            res.json({ error: true, msg: 'College Created' });
        }
    });
});
router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;

    College.getAllColleges(page, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.json({ error: true, msg: err });
        }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var college = {
        name: req.body.name
    };
    College.findByIdAndUpdate(req.params.id, { $set: college }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "College Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update College" + err });
        }
    });
})
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    College.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted College' });
        } else {
            res.json({ error: true, msg: "Failed to Delete College" });
        }
    });
});

module.exports = router;