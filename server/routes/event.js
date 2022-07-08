// imports/requirements
const express = require("express");
const eventRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// get all events
eventRoutes.route("/event").get((req, res) => {
    let db_connect = dbo.getDb();
    db_connect
        .collection("events")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// get an event by its id; doubles as the url extension
eventRoutes.route("/event/:id").get((req, res) => {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("events")
        .findOne(query, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// create a new event
eventRoutes.route("/event/add").post((req, response) => {
    let db_connect = dbo.getDb();
    let obj = {
        name: req.body.name,
        desc: req.body.desc,
        start: req.body.start,
        end: req.body.end,
        days: req.body.days,
    };
    db_connect.collection("events").insertOne(obj, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = eventRoutes;