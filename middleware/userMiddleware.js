const bcrypt = require("bcrypt");
const supabase = require("../db/config");
// require("dotenv").config();

const isUserExist = async (req, res, next) => {
  if (req.body.password != req.body.repassword) {
    res.status(400).send("password doesnt match repassword");
    return;
  }
  const user = await supabase
    .from("users")
    .select("*")
    .eq("email", req.body.email);
  // console.log(user.data.length)
  if (user.data.length > 0) {
    res.status(400).send("User already exists");
    return;
  }
  next();
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(`${req.body.password}`, salt);
    req.body.password = hashedPassword;
    console.log(req.body.password);
    next();
  } catch (e) {
    console.error(e);
  }
};

async function checkUser(req, res, next) {
  const user = await supabase
    .from("users")
    .select("*")
    .eq("email", req.body.email);
  if (user.data.length == 0) {
    console.log(user.data);
    res.status(400).send(false);
    return;
  }
  req.result = user.data[0];
  next();
}

async function checkpassword(req, res, next) {
  const check = await bcrypt.compare(
    `${req.body.password}`,
    `${req.result.password}`
  );
  console.log(check);
  console.log(req.result);
  if (check) {
    next();
  }
}

module.exports = { isUserExist, hashPassword, checkUser, checkpassword };
