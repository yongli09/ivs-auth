const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user.model.js');

exports.refreshToken = async (req, res) => {
    try {
        const { token }  = req.body;

        jwt.verify(token, 'refresh-secret', (error, user) => {
            if (error) throw error;
            jwt.sign(
                user,
                "secret",
                {
                  expiresIn: 60
                },
                (err, accessToken) => {
                  if (err) throw err;
                  const refreshToken = jwt.sign(user, 'refresh-secret');
                  res.status(200).json({
                      status: "success",
                      data: {
                          accessToken,
                          refreshToken,
                          user: user.user
                      }
                  });
                }
              );
      

        })
      } catch (err) {
        return res.status(500).send({
            status: "failed",
            message: err
        });
      }
}

exports.getToken = async (req, res) => {
  try {

    const { name, email }  = req.body;
    let user = await User.findOne({
      name, email
    })
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User Not Exist"
      });
    }
    const payload = {
      user
    };
    jwt.sign(
      payload,
      "secret",
      {
        expiresIn: 6000
      },
      (err, accessToken) => {
        if (err) throw err;
        const refreshToken = jwt.sign(payload, 'refresh-secret');

        res.status(200).json({
            status: "success",
            data: {
                accessToken,
                refreshToken,
                user
            }
        });
      }
    );
  } catch (err) {
    return res.status(500).send({
        status: "failed",
        message: err
    });
  }
}
