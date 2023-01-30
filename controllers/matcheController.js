const supabase = require("../db/config");

const getUserLastScore = async (req, res) => {
  try {
    const userLastScore = await supabase
      .from("matches")
      .select("*")
      .eq("winner", req.params.id)
      .first();
    res.send(userLastScore);
  } catch (err) {
    res.status(500).send(err);
  }
};

function filterConsecutive(array, column) {
  return array.filter((row, index) => {
    if (index === 0) return true;
    return row[column] === array[index - 1][column] + 1;
  });
}

const getUsersLongStrike = async (req, res) => {
  try {
    const longStrike = await supabase
      .from("matches")
      .select("*")
      .eq("winner", req.params.id);
    const newLongStrike = filterConsecutive(longStrike, "match_id");
    return newLongStrike;
  } catch (err) {
    res.status(500).send(err);
  }
};

const addMatche = async (req, res) => {
  const { u1_id, u2_id, winner } = req.body;
  try {
    const newMatche = {
      u1_id: u1_id,
      u2_id: u2_id,
      winner: winner,
    };
    const matcheAdded = await supabase.from("games").insert(newMatche);
    res.send(matcheAdded);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUsersMatcheHistory = async (req, res) => {
  try {
    const usersHistory = await supabase
      .from("matcues")
      .select("*")
      .eq("u1_id" || "u2_id", req.params.id);
    res.send(usersHistory);
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
