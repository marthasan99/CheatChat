const fs = require("node:fs");
const userFormValidation = (req, res, next) => {
  const { uname, email, password, image_upload } = req.body;

  if (uname == "" || email == "" || password == "") {
    if (req.file.filename != undefined) {
      fs.unlinkSync("./public/images/" + req.file.filename);
    }
  }
  if (uname == "") {
    return res.send({
      error: {
        uname: "User Name Required",
      },
    });
  }
  if (email == "") {
    return res.send({
      error: {
        email: "Email is Required",
      },
    });
  }
  if (password == "") {
    return res.send({
      error: {
        password: "Password is Required",
      },
    });
  }
  if (image_upload == "") {
    return res.send({
      error: {
        image: "Photo is Required",
      },
    });
  }

  if (uname != "" && email != "" && password != "" && image_upload != "") {
    console.log("Next", req.body);
    next();
  }
};

module.exports = userFormValidation;
