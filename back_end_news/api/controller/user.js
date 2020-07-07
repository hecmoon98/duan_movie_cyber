const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.user_signup_post = (req, res, next) => {
  User.find({ taiKhoan: req.body.taiKhoan })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.matKhau, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          if (hash) {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              taiKhoan: req.body.taiKhoan,
              matKhau: hash,
              hoTen: req.body.hoTen,
              chucVu: req.body.chucVu
            });

            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login_post = (req, res, next) => {
  User.findOne({ taiKhoan: req.body.taiKhoan })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "mail not found, user doesn"
        });
      }
      bcrypt.compare(req.body.matKhau, user.matKhau, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "mail not found, user doesn"
          });
        }
        if (result) {
          console.log(result)
          if (user.chucVu === "Quang Li") {
            const token = jwt.sign(
              {
                taiKhoan: user.taiKhoan,
                userId: user._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              taiKhoan:user.taiKhoan,
              hoTen:user.hoTen,
              chucVu:user.chucVu,
              token: token
            });
          }
          return res.status(200).json({
            message: "Auth successful"
          });
        }

        res.status(404).json({
          message: "mail not found, user doesn"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User Deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_get = (req, res, next) => {
  User.find()
    .then(result => {
      res.status(200).json(
        res.status(200).json({
          count: result.length,
          user: result.map(item => {
            return {
              _id: item._id,
              taiKhoan: item.taiKhoan,
              matKhau: item.matKhau,
              hoTen: item.hoTen,
              chucVu: item.chucVu
            };
          })
        })
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_put = (req, res, next) => {
  bcrypt.hash(req.body.matKhau, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }
    if (hash) {
      const id = req.params.userId;
    User.findByIdAndUpdate(
      { _id: id },
      {
        _id: req.body._id,
        taiKhoan: req.body.taiKhoan,
        matKhau: hash,
        hoTen: req.body.hoTen,
        chucVu: req.body.chucVu
      }
    )
      .exec()
      .then(() => {
        User.findOne({ _id: id }).then(result => {
          res.status(200).json({
            category: result,
            message: "User Updated"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
    
  });
};
