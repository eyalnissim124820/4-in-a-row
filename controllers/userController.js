const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const supabase = require("../db/config")

const addUser = async (req, res) => {
  const { email, password , nickname } = req.body;
  try {
    const newUser = {
      email: email,
      password: password,
      nickname: nickname,
    };
    supabase.from("users").insert(newUser).then(()=>{
      console.log("user added")
    })
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

function loginUser(req,res){
  res.send({...req.result, password: null})
  console.log("loggedin")
}

module.exports = {
  addUser,
  loginUser
};
