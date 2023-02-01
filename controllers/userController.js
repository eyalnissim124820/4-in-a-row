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
  const userDetails = {
    id,
    nickname,
    token,
  };
  res.send(userDetails);
  console.log("loggedin");
}

const getTopScores = async (req, res) => {
  try {
    const topScores = await supabase.from("users").select("nickname,score");
    const newTopScores = topScores.data.sort((a, b) => b.score - a.score);
    res.send(newTopScores);
  } catch (err) {
    res.status(500).send(err);
  }
};

async function getUsersCurrentScore(req, res) {
  try {
    const usersScore = await supabase
      .from("users")
      .select("score")
      .eq("id", req.params.userId);
    res.send(usersScore);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  addUser,
  loginUser,
  getTopScores,
  getUsersCurrentScore,
};
