const supabase = require("../db/config");

const getUserLastScore = async (req, res) => {
  try {
    const userLastScore = await supabase
      .from("matches")
      .where({ u1_Id: req.params.id } || { u2_Id: req.params.id })
      .first();
    res.send(userLastScore);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUsersLongStrike = async (req, res) => {
  try {
    const longStrike = await supabase
      .from("matches")
      .where({ id: req.params.id });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getUsersLongStrike,
  getUsersMatcheHistory,
  addMatche,
  getUserLastScore,
};
