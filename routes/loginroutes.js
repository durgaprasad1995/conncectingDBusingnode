var mysql = require("mysql");
var connection = mysql.createConnection({
  port: "3306",
  user: "root",
  password: "",
  database: "durgaprasad"
});
connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

//Then we create handler for user registration:

exports.register = function(req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var users = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
    modified: today
  };
  connection.query("INSERT INTO users SET ?", users, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log("The solution is: ", results);
      res.send({
        code: 200,
        success: "user registered sucessfully"
      });
    }
  });
};

//Next is handler for user login and validating user credentials:

exports.login = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query("SELECT * FROM users WHERE email = ?", [email], function(
    error,
    results,
    fields
  ) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        if (results[0].password == password) {
          res.send({
            code: 200,
            success: "login sucessfull"
          });
        } else {
          res.send({
            code: 204,
            success: "Email and password does not match"
          });
        }
      } else {
        res.send({
          code: 204,
          success: "Email does not exits"
        });
      }
    }
  });
};

exports.employeeUser = function(req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var employeedetails = {
    UserName: req.body.UserName,
    EmailId: req.body.EmailId,
    Details: req.body.Details,
    created: today
  };
  connection.query("INSERT INTO employeeuser SET ?", employeedetails, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log("The solution is: ", results);
      res.send({
        code: 200,
        success: "user Added Successfully"
      });
    }
  });
};
exports.employeeList = function(req, res) {
  connection.query("SELECT * FROM employeeuser", function(error, results) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log("The solution is: ", results);
      res.send({
        code: 200,
        results
      });
    }
  });
};

exports.employeeUpdate = function(req, res) {
  var today = new Date();
  var employeedetails = {
    UserName: req.body.UserName,
    EmailId: req.body.EmailId,
    Details: req.body.Details,
    created: today
  };
  connection.query(
    // "UPDATE `employeeuser` SET `UserName`= `" +
    //   employeedetails.UserName +
    //   "` WHERE `employeeuser`.`id` = 3",

    "UPDATE `employeeuser` SET `UserName` = '" +
      employeedetails.UserName +
      "' WHERE `employeeuser`.`id` = 1",
    function(error, results) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        console.log("The solution is: ", results);
        res.send({
          code: 200,
          success: "list Added Successfully"
        });
      }
    }
  );
};
