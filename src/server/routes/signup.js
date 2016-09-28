let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let knex = require('knex');

//route to signup for new account
router.post('/signup', (req, res, next) => {
  let password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  knex('users')
  .insert({
    // additional fields
    // first_name: req.body.first_name,
    // last_name: req.body.last_name,
    // email: req.body.email,
    // password: hash
  })
  .then((newUser) => {
    res.redirect('/');
  })
  .catch((err) => {
    res.status(404).send({
      status: 'Failed',
      message: err
    });
  });
});
