const express = require("express");
const userModel = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailSend = require("../../utilities/emailSend.js");
const saltRounds = 10;
const privateKey = process.env.PRIVATE_KEY;
var cors = require("cors");
const app = express();

app.use(cors());

const auth = {
  login(req, res) {
    const { uname, email, password } = req.body;
    console.log(req.body, req.file.filename);

    bcrypt.hash(password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      let token = jwt.sign(email, privateKey, { algorithm: "HS384" });

      // console.log(`token=>${token}  Hash=>${hash}`);
      const user = new userModel({
        uname,
        email,
        password: hash,
        image: req.file.filename,
      });

      user.save();
      emailSend(email, token);
    });

    res.send({
      success: "Data Uploaded",
    });
  },

  tokenCheck(req, res) {
    const token = req.params.id;
    console.log(req.params.id);
    jwt.verify(token, privateKey, async function (err, decoded) {
      console.log(decoded); // bar
      if (decoded) {
        const userUpdate = await userModel.findOneAndUpdate(
          { email: decoded },
          { emailVerified: true },
          { new: true }
        );
        res.redirect("http://localhost:1010/api/v1/backend/auth/loginpage");
      } else {
        res.send({ error: "token not verified" });
      }
    });

    res.send("ok");
  },

  loginPage(req, res) {
    res.redirect("http://localhost:5173");
    res.send({ success: "ok" });
  },

  async login2(req, res) {
    console.log(req.body);

    const { email, password } = req.body;
    const userInfo = await userModel.findOne({ email });

    if (userInfo) {
      console.log("Output=>", userInfo);
      if (userInfo.emailVerified) {
        bcrypt.compare(password, userInfo.password, function (err, result) {
          if (result) {
            const userLoggedIn = Date.now() + (7 * 24 * 60 * 60) / 1000;
            return res.send({
              success: "Authentication Successful",
              data: {
                uname: userInfo.uname,
                email: userInfo.email,
                image: userInfo.image,
                userId: userInfo._id,
                userLoggedIn: userLoggedIn,
                login: true,
              },
            });
          } else {
            return res.send({ error: "Authentication Failed1" });
          }
        });
      } else {
        return res.send({ error: "Email is not verified" });
      }
    } else return res.send({ error: "Authentication Failed2" });
  },
};

module.exports = auth;
