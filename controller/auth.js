const connection = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const signIn = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    connection.query(
      "select * from users where username = ?",
      [username],
      function (error, results, fields) {
        if (!error) {
          if (results.length > 0) {
            if (bcrypt.compare(password, results[0].password)) {
              const token = jwt.sign({ username }, secret, {
                expiresIn: 60 * 60 * 24 * 2,
              });

              res.status(200).json({
                success: true,
                message: `Welcome ${results[0].username}.`,
                token,
              });
            } else {
              res
                .status(401)
                .json({ success: false, message: "Incorrect password." });
            }
          } else {
            res.status(401).json({
              success: false,
              message: "The username doesn't exists in database.",
            });
          }
        } else {
          res.status(500).send([]);
        }
      }
    );
  } else {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const signUp = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    connection.query(
      "select * from users where username = ?",
      [username],
      async function (error, results, fields) {
        if (!error) {
          if (results.length > 0) {
            res.status(401).json({
              success: false,
              message: "The username is already in use.",
            });
          } else {
            const encyptedPassword = await encryptPassword(password);

            const token = jwt.sign({ username }, secret, {
              expiresIn: 60 * 45 * 100,
            });

            connection.query(
              `insert into users (id, username, password) values (NULL, ?, ?)`,
              [username, encyptedPassword],
              function (error, results, fields) {
                if (!error) {
                  res.status(200).json({
                    success: true,
                    message: "Good to go.",
                    token,
                  });
                } else {
                  res.status(500).send(error);
                }
              }
            );
          }
        } else {
          res.status(500).json({ success: false, message: "Server error" });
        }
      }
    );
  } else {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const session = async (req, res) => {
  const { username } = req.body;

  if (username) {
    connection.query(
      "select * from users where username = ?",
      [username],
      function (error, results, fields) {
        if (!error) {
          if (results.length > 0) {
            res
              .status(200)
              .json({ success: true, message: "The username exists", results });
          } else {
            res.status(401).json({
              success: false,
              message: "The username doesn't exists in database.",
            });
          }
        } else {
          res.status(500).json({ success: false, message: "Server error" });
        }
      }
    );
  } else {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { signIn, signUp, session };
