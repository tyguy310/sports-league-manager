const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const queries = require('../db/queries');

router.post('/', (req, res, next) => {
  let results = {};
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  if ((!email && !password) || (!username && !password)) {
    results.message = 'Must enter username or email and password';
    res.json(results);
  } else {
    queries.login(email, username, (err, result) => {
      if (err) {
        results.message = 'Incorrect something or other.';
        res.json(results);
      }
      else {
        if (bcrypt.compareSync(password, result[0].password)) {
          let renderObject = {};
          queries.joinAccountPlayer(result[0].id, (err, player) => {
            if (err) {
              renderObject.message = 'Unable to find ID';
              res.json(renderObject);
            }
            else {
              renderObject = player;
              res.json(renderObject);
            }
          });
        } else {
          results.message = 'Incorrect username or password.';
          res.json(results);
        }
      }
    });
  }
});

module.exports = router;
