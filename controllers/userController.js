const bcrypt = require("bcrypt");
const { addUserModel, getUserDetailModal } = require("../modals/userModals");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const supabase = require("../db/config")

const addUser = async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    const newUser = {
      email: email,
      password: password,
      nickname: nickname
    };
    // const user = await addUserModel(newUser);
    supabase.from("users").insert(newUser).then(()=>{
      console.log("user added")
    })
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

// const loginUser = (req, res) => {
//   const { password, user } = req.body;
//   try {
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       } else if (!result) {
//         res.status(400).send("Password does not match");
//       } else {
//         const token = jwt.sign(
//           {
//             id: user.userId,
//             name: user.firstName + " " + user.lastName,
//             admin: user.admin,
//           },
//           process.env.TOKEN_SECRET,
//           {
//             expiresIn: "1h",
//           }
//         );
//         //    check bearer token
//         res.send({
//           ok: true,
//           name: `${user.firstName} ${user.lastName}`,
//           admin: user.admin,
//         });
//       }
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

module.exports = {
  addUser,
  // loginUser,
};
