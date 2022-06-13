const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const port = 3001;
const secretKey = "vanitas";

const app = express();
app.use(cors());
app.use(fileUpload());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cargo",
});

app.get("/gete", (req, res) => {
  res.json({ status: "200" });
});

app.post("/registed", (req, res) => {
  const userId = req.body.userId;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const phoneNum = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const confpassword = req.body.confpassword;

  if (password !== confpassword) {
    return res.status(400).send({
      status: 400,
      msg: "Password and Confrim Password do not match",
    });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        console.log(err);
      }
      if (hash) {
        connection.query(
          "INSERT INTO account (userId , password) VALUES (?,?)",
          [userId, hash],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result) {
              res.send({ status: 200, msg: "Registeration Successfully" });
            }
          }
        );

        connection.query(
          "INSERT INTO account_info (userId , firstName , lastName , email , phoneNum) VALUES (?,?,?,?,?)",
          [userId, firstName, lastName, email, phoneNum],
          (err, result) => {}
        );
      }
    });
  }
  //   console.log(req.body);
});

app.post("/logged", (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  if (userId && password) {
    connection.query(
      "SELECT * FROM account WHERE userId = ?",
      [userId],
      (err, users) => {
        if (err) {
          res.send({ err: err });
        }
        if (users.length > 0) {
          bcrypt.compare(password, users[0].password, function (err, result) {
            if (result) {
              const token = jwt.sign({ userId: users[0].userId }, secretKey, {
                expiresIn: "1h",
              });
              res.json({ status: 200, msg: "Logging successfully !", token });
            } else {
              res.json({
                status: 404,
                msg: "Wrong email/password combination!",
              });
            }
          });
        } else {
          res.send({ status: 404, msg: "Wrong email combination!" });
        }
      }
    );
  } else {
    res.send("Please enter Username and Password!");
  }
});

app.post("/authen", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    res.json({ status: 200, msg: "Verified", decoded });
  } catch (error) {
    res.json({ status: 404, msg: "Failed" });
  }
});

app.get("/account", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);

    connection.query(
      "SELECT * FROM account_info WHERE userId = ?",
      [decoded.userId],
      (err, result) => {
        if (err) {
          res.json({ status: 404, msg: err });
        }
        if (result.length > 0) {
          res.json({ status: 200, info: result[0] });
        } else {
          res.json({ status: 404, msg: "Not found" });
        }
      }
    );
  } catch (error) {}
});

app.post("/updateinfo", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNum = req.body.phoneNum;

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, secretKey);

  connection.query(
    "UPDATE account_info SET firstName = ? , lastName = ? ,  phoneNum = ? WHERE userId = ?",
    [firstName, lastName, phoneNum, decoded.userId],
    (err, result) => {
      if (err) {
        res.json({ status: 404, msg: err });
      }
      if (result) {
        // console.log("updated");
        res.json({ status: 200, msg: "Updated" });
      }
    }
  );
});

app.post("/service", (req, res) => {
  const ship = req.body.ship;
  const destination = req.body.destination;
  const date = req.body.date;
  let query = "SELECT * FROM service WHERE 1 = 1 AND status = ?";
  let queryData = ["available"];
  if (ship !== "") {
    query = query + " AND serviceName = ?";
    queryData.push(ship);
  }
  if (destination !== "") {
    query = query + " AND portDestination = ?";
    queryData.push(destination);
  }
  if (date !== "NaN-NaN-NaN") {
    query = query + " AND date = ?";
    queryData.push(date);
  }

  // console.log(query);
  // console.log(queryData);

  connection.query(query, queryData, (err, result) => {
    if (err) {
    }
    if (result) {
      res.json({ status: 200, msg: "Successfully", result });
    }
  });
});

app.post("/booking", (req, res) => {
  const id = req.body.id;
  connection.query(
    "SELECT * FROM service WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.json({ status: 404, msg: err });
      }
      if (result) {
        res.json({ status: 200, msg: "Success", result });
      }
    }
  );
});

app.post("/bookingorder", (req, res) => {
  const container = req.body.container;
  const type = req.body.type;
  const serviceId = req.body.serviceId;
  const token = req.headers.authorization.split(" ")[1];
  const time = req.body.time;
  const priceContainer = req.body.price;

  // console.log(container);
  const decoded = jwt.verify(token, secretKey);
  const ft20 = container.filter((d) => d.age == 20);
  const ft40 = container.filter((d) => d.age == 40);
  const ft45 = container.filter((d) => d.age == 45);
  let q20 = 0;
  let q40 = 0;
  let q45 = 0;
  let price = 0;

  const status = "pending";

  if (ft20.length > 0) {
    ft20.map((ft) => {
      q20 = q20 + parseInt(ft.name);
    });
    price += q20 * priceContainer[0].price;
  }
  if (ft40.length > 0) {
    ft40.map((ft) => {
      q40 = q40 + parseInt(ft.name);
    });
    price += q40 * priceContainer[1].price;
  }
  if (ft45.length > 0) {
    ft45.map((ft) => {
      q45 = q45 + parseInt(ft.name);
    });
    price += q45 * priceContainer[2].price;
  }

  // console.log(price);
  connection.query(
    "INSERT INTO booking_details (userId , serviceId , containerType ,quantityFT20 , quantityFT40, quantityFT45 ,time,price ,status) VALUES (?,?,?,?,?,?,?,?,?)",
    [decoded.userId, serviceId, type, q20, q40, q45, time, price, status],
    (err, result) => {
      if (err) {
        res.json({ status: 400, msg: err });
      }
      if (result) {
        res.json({ status: 200, msg: "Booking successfully" });
      }
    }
  );
});

app.get("/history", (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    connection.query(
      "SELECT *, booking_details.status AS bookingStatus FROM booking_details INNER JOIN service ON service.id = booking_details.serviceId  WHERE userId = ? ORDER BY bookingId DESC",
      [decoded.userId],
      (err, result) => {
        if (err) {
          res.json({ status: 400, msg: err });
        }
        if (result) {
          res.json({ status: 200, result });
        }
      }
    );
  } else {
    connection.query(
      "SELECT *, booking_details.status AS bookingStatus FROM booking_details INNER JOIN service ON service.id = booking_details.serviceId ORDER BY bookingId DESC",
      [],
      (err, result) => {
        if (err) {
          res.json({ status: 400, msg: err });
        }
        if (result) {
          res.json({ status: 200, result });
        }
      }
    );
  }
});

app.post("/uploadpayment", (req, res) => {
  if (req.files === null) {
    res.status(400).json({ msg: "No file upload" });
  }
  const file = req.files.fileData;
  file.mv(`${__dirname}/upload/${file.name}.png`, (err) => {
    if (err) {
      console.log(err);
    }

    connection.query(
      "UPDATE booking_details SET status = ? WHERE bookingId = ?",
      ["paid", file.name],
      (err, result) => {
        if (result) {
          res.json({
            status: 200,
            fileName: file.name,
            filePath: `/upload/${file.name}.png`,
          });
        }
      }
    );
  });
});

app.get("/imgpayment/:id", (req, res) => {
  const bookingId = req.params.id;
  if (bookingId) {
    res.sendFile(__dirname + "/upload/" + bookingId + ".png");
  } else {
    res.json({ status: 403, msg: "Something went wrong!" });
  }
});

app.post("/updatestatus", (req, res) => {
  const data = req.body.status;
  if (data.length > 0) {
    for (let index = 0; index < data.length; index++) {
      const d = data[index];
      connection.query(
        "UPDATE booking_details SET status = ? WHERE bookingId = ?",
        [d.bookingStatus, d.bookingId],
        (err, result) => {
          if (err) {
            res.json({ status: 400, msg: err });
          }
          if (result) {
            if (index == data.length - 1) {
              res.send({ status: 200, msg: "Updated" });
            }
          }
        }
      );
    }
  }
});

app.post("/addship", (req, res) => {
  const ship = req.body.ship;
  const shipID = req.body.shipID;
  const country = req.body.country;
  const status = req.body.status;
  const shipment = req.body.shipment;
  const destination = req.body.destination;
  const trantime = req.body.trantime;
  const date = req.body.date;

  connection.query(
    "INSERT INTO service (serviceName,shipId,country,portShipment,portDestination,transactionTime,status,date) VALUES (?,?,?,?,?,?,?,?)",
    [ship, shipID, country, shipment, destination, trantime, status, date],
    (err, result) => {
      if (err) {
        res.json({ status: 400, msg: err });
      }
      if (result) {
        res.json({ status: 200, msg: "Insert successfully" });
      }
    }
  );
});

app.get("/adminservice", (req, res) => {
  connection.query("SELECT * FROM service", [], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.json({ status: 200, result });
    }
  });
});

app.get("/delservice/:id", (req, res) => {
  const serviceId = req.params.id;
  if (serviceId) {
    connection.query(
      "DELETE FROM service WHERE id = ?",
      [serviceId],
      (err, result) => {
        if (err) {
          res.json({ status: 400, msg: err });
        }
        if (result) {
          res.json({ status: 200, msg: "Deleted" });
        }
      }
    );
  }
});

app.get("/editservice/:id", (req, res) => {
  const serviceId = req.params.id;
  if (serviceId) {
    connection.query(
      "SELECT * FROM service WHERE id = ?",
      [serviceId],
      (err, result) => {
        if (result) {
          res.json({ status: 200, result });
        }
      }
    );
  }
});

app.post("/updateservice", (req, res) => {
  const id = req.body.id;
  const ship = req.body.ship;
  const shipID = req.body.shipID;
  const country = req.body.country;
  const status = req.body.status;
  const shipment = req.body.shipment;
  const destination = req.body.destination;
  const trantime = req.body.trantime;
  const date = req.body.date;

  connection.query(
    "UPDATE service SET serviceName = ? , shipId = ? , country = ?,portShipment = ? ,portDestination =? ,transactionTime = ? , status = ? , date = ? WHERE id = ?",
    [ship, shipID, country, shipment, destination, trantime, status, date, id],
    (err, result) => {
      if (result) {
        res.json({ status: 200, msg: "Updated" });
      }
      if (err) {
        res.json({ status: 400, msg: err });
      }
    }
  );
});

app.get("/container", (req, res) => {
  connection.query("SELECT * FROM container", [], (err, result) => {
    if (result) {
      res.json({ status: 200, result });
    }
  });
});


app.post("/updatecontainer", (req, res) => {
  const { ft20, ft40, ft45 } = req.body;
  connection.query(
    "UPDATE container SET price = ? WHERE ft = 20",
    [ft20],
    (err, result) => {}
  );
  connection.query(
    "UPDATE container SET price = ? WHERE ft = 40",
    [ft40],
    (err, result) => {}
  );
  connection.query(
    "UPDATE container SET price = ? WHERE ft = 45",
    [ft45],
    (err, result) => {
      if(result){
        res.json({status: 200, msg: "Updated !"})
      }
    }
  );

});

app.post("/adminlogin", (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM account WHERE userId = ? AND password = ?",
    [userId, password],
    (err, result) => {
      if (result.length > 0) {
        const token = jwt.sign({ userId: result[0].userId }, secretKey, {
          expiresIn: "8h",
        });
        res.json({ status: 200, token });
      } else {
        res.json({ status: 404, msg: "ID/Password wrong" });
      }
    }
  );
});

app.get("/editorder/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT *, booking_details.status AS bookingStatus FROM booking_details INNER JOIN service ON service.id = booking_details.serviceId  WHERE bookingId = ? ORDER BY bookingId DESC",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        res.json({ status: 200, result });
      }
    }
  );
});

app.post("/updateorder", (req, res) => {
  const {
    id,
    ship,
    country,
    shipment,
    destination,
    type,
    ft20,
    ft40,
    ft45,
    container,
  } = req.body;

  let price = 0;
  if (ft20) {
    price += ft20 * container[0].price;
  }
  if (ft40) {
    price += ft40 * container[1].price;
  }
  if (ft45) {
    price += ft45 * container[2].price;
  }

  connection.query(
    "UPDATE booking_details SET containerType = ? ,quantityFT20 = ?,quantityFT40 =? , quantityFT45 = ? ,price = ? WHERE bookingId = ?",
    [type, ft20, ft40, ft45, price, id],
    (err, result) => {
      if (err) {
        res.json({ status: 400, msg: err });
      }
      if (result) {
        res.json({ status: 200, msg: "Updated !" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});