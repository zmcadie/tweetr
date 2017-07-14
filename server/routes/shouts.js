"use strict";

const userHelper    = require("../lib/util/user-helper");

const express       = require('express');
const shoutsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  shoutsRoutes.get("/", function(req, res) {
    DataHelpers.getShouts((err, shouts) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(shouts);
      }
    });
  });

  shoutsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const shout = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveShout(shout, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return shoutsRoutes;

};
