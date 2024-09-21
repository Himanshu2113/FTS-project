import express from "express";
import mongoose from "mongoose";
// import pg from "pg";
import env from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import session from "express-session";
// import passport from "passport";
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
env.config();

const uri = process.env.MONGODB_URI;

const m = mongoose.connect(uri);
var conn = mongoose.connection;
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  feelings: String,
  reasonf: String,
  thoughts: String,
  reasont: String,
  secrets: String,
});

const jwtKey = process.env.JWT_KEY;

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      jwtKey,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const UserModel = new mongoose.model("fts", UserSchema);

// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "FTS",
//   password: "",
//   port: 5432,
// });
// db.connect();
var data;
var verify;
app.get("/api/f", verifyToken, (req, res) => {
  UserModel.find({ feelings: { $ne: null } })
    .then(function (users) {
      res.json(users);
      // console.log(users);
      // data = users;
    })
    .catch(function (err) {
      console.log(err);
    });
});

// app.get("/api/f", (req, res) => {
//   db.query(
//     "SELECT feelings,reasonf FROM fts WHERE feelings IS NOT NULL",
//     (err, res) => {
//       if (err) {
//         console.error("Error executing query", err.stack);
//       } else {
//         data = res.rows;
//         // console.log(res.rows);
//       }
//     }
//   );
//   res.json(data);
//   // console.log(data);
//   console.log("Server is running on port 3000");
// });

app.get("/api/t", verifyToken, (req, res) => {
  UserModel.find({ thoughts: { $ne: null } })
    .then(function (users) {
      res.json(users);
      // console.log(users);
      data = users;
    })
    .catch(function (err) {
      console.log(err);
    });
});
// app.get("/api/t", (req, res) => {
//   db.query(
//     "SELECT thoughts,reasont FROM fts WHERE thoughts IS NOT NULL",
//     (err, res) => {
//       if (err) {
//         console.error("Error executing query", err.stack);
//       } else {
//         data = res.rows;
//         // console.log(res.rows);
//       }
//     }
//   );
//   res.json(data);
//   console.log("Server is running on port 3000");
// });

app.get("/api/s", verifyToken, (req, res) => {
  UserModel.find({ secrets: { $ne: null } })
    .then(function (users) {
      res.json(users);
      // console.log(users);
      data = users;
    })
    .catch(function (err) {
      console.log(err);
    });
});
// app.get("/api/s", (req, res) => {
//   db.query("SELECT secrets FROM fts WHERE secrets IS NOT NULL", (err, res) => {
//     if (err) {
//       console.error("Error executing query", err.stack);
//     } else {
//       data = res.rows;
//       // console.log(res.rows);
//     }
//   });
//   res.json(data);

//   console.log("Server is running on port 3000");
// });

app.post("/api/register", async (req, res) => {
  verify = req.body.email;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({
      error: "Please fill all the fields",
    });
    console.log("Please fill all the fields");
    return;
  }

  const check = await UserModel.findOne({ email: email });
  if (check == null) {
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const user = new UserModel({
        email: email,
        password: hashedpassword,
      });
      user
        .save()
        .then(async (user) => {
          res.json({
            message: "Registered successfully",
            token: await user.generateToken(),
            userId: user._id.toString(),
          });
          console.log("User saved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    res.status(422).json({ error: "User already exist with that email" });
    console.log("A user with same credentials exist.");
  }
});

app.post("/api/login", async (req, res) => {
  verify = req.body.email;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({
      error: "Please fill all the fields",
    });
    console.log("Please fill all the fields");
    return;
  }
  await UserModel.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      console.log("Invalid Email");
      return res.status(422).json({ error: "Invalid email" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then(async (match) => {
        if (match) {
          console.log("Signed in successfully");
          return res.status(200).json({
            message: "Signed in successfully",
            token: await savedUser.generateToken(),
            userId: savedUser._id.toString(),
          });
        } else {
          console.log("Invalid password");
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });
  // console.log(a);
  // if (a) {
  //   return res.status(200).json({ message: "Signed in successfully" });
  //   console.log("User exists");
  // } else {
  //   res.status(422).json({ error: "Invalid email or password" });
  //   console.log("No such user found");
  // }
});

app.post("/api/submitf", verifyToken, async (req, res) => {
  const finds = await UserModel.findOne({ email: verify });
  var myquery = { email: verify };
  const { feelings, reasonf } = req.body;
  var newvalues = {
    $set: { feelings: req.body.feelings, reasonf: req.body.reasonf },
  };
  if (finds) {
    await UserModel.updateOne(myquery, newvalues)
      .then((saved) => {
        res.json({ message: "Your feelings are saved successfully" });
        console.log("Feelings added successfully");
      })
      .catch((err) => {
        res.json({ error: "Feelings cannot be added due to some error" });
        console.log("Feelings cannot be added.");
      });
  } else {
    res.json({ error: "You need to register or login first" });
  }
});
// app.post("/api/submitf", (req, res) => {
//   let data1 = { feelings: req.body.feelings, reasonf: req.body.reasonf };
//   db.query(
//     "INSERT INTO FTS (feelings,reasonf) VALUES ($1,$2) ",
//     [req.body.feelings, req.body.reasonf],
//     (error, results) => {
//       if (error) {
//         throw error;
//         console.log(error);
//       }
//       res.status(201).send(`Feeling added successfully`);
//     }
//   );
// });

app.post("/api/submitt", verifyToken, async (req, res) => {
  // console.log(verify);
  const finds = await UserModel.findOne({ email: verify });
  var myquery = { email: verify };
  var newvalues = {
    $set: { thoughts: req.body.thoughts, reasont: req.body.reasont },
  };
  if (finds) {
    await UserModel.updateOne(myquery, newvalues)
      .then((saved) => {
        res.json({ message: " Your thoughts are saved successfully" });
        console.log("Thoughts added successfully");
      })
      .catch((err) => {
        res.json({ error: "Thoughts cannot be added due to some error." });
        console.log("Thoughts cannot be added.");
      });
  } else {
    res.json({ error: "You need to register first" });
  }
});
// app.post("/api/submitt", (req, res) => {
//   let data1 = { thoughts: req.body.feelings, reasont: req.body.reasonf };
//   db.query(
//     "INSERT INTO FTS (thoughts,reasont) VALUES ($1,$2) ",
//     [req.body.thoughts, req.body.reasont],
//     (error, results) => {
//       if (error) {
//         throw error;
//         console.log(error);
//       }
//       res.status(201).send(`Thought added successfully`);
//     }
//   );
// });

app.post("/api/submits", verifyToken, async (req, res) => {
  // console.log(verify);
  const finds = await UserModel.findOne({ email: verify });
  var myquery = { email: verify };
  var newvalues = {
    $set: { secrets: req.body.secrets },
  };
  if (finds) {
    await UserModel.updateOne(myquery, newvalues)
      .then((saved) => {
        res.json({ message: "Your secrets are saved successfully" });
        console.log("Secrets added successfully");
      })
      .catch((err) => {
        res.json({ error: "Secrets cannot be added due to some error" });
        console.log("Secrets cannot be added.");
      });
  } else {
    res.json({ error: "You need to register first" });
  }
});
// app.post("/api/submits", (req, res) => {
//   let data1 = { secrets: req.body.secrets };
//   db.query(
//     "INSERT INTO FTS (secrets) VALUES ($1) ",
//     [req.body.secrets],
//     (error, results) => {
//       if (error) {
//         throw error;
//         console.log(error);
//       }
//       res.status(201).send(`Secret added successfully`);
//     }
//   );
// });
function verifyToken(req, res, next) {
  let token = req.headers["token"];
  if (token == null) {
    res.status(403).send({ error: "Please login first" });
  } else {
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res
          .status(401)
          .send({ error: "Please provide correct authentication details" });
      } else next();
    });
  }
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
