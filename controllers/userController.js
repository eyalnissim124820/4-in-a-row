const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const supabase = require("../db/config");

const addUser = async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    const newUser = {
      email: email,
      password: password,
      nickname: nickname,
    };
    supabase
      .from("users")
      .insert(newUser)
      .then(() => {
        console.log("user added");
      });
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

function loginUser(req, res) {
  const { id, nickname } = req.result;
  const token = jwt.sign(
    {
      id: id,
      nickname: nickname,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.send(token);
  console.log("loggedin");
}

const getTopScores = async (req, res) => {
  try {
    const topScores = await supabase
      .from("users")
      .select("nickname,score")
      .limit(10);
    const newTopScores = topScores.data.sort((a, b) => b.score - a.score);
    res.send(newTopScores);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addUser,
  loginUser,
  getTopScores,
};
