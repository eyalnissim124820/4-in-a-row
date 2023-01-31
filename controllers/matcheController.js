const colorSupport = require("color-support");
const { map } = require("lodash");
const supabase = require("../db/config");

const getUserLastScore = async (req, res) => {
  console.log(req.params);
  try {
    const userLastScore = await supabase
      .from("games")
      .select("*")
      .eq("winner", req.params.userId);
    res.send(userLastScore.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUsersLongStrike = async (req, res) => {
  try {
    const longStrike = await supabase
      .from("games")
      .select("*")
      .or(`u2_id.eq.${req.params.userId},u1_id.eq.${req.params.userId}`);
    let currentStreak = 0;
    let longestStreak = 0;
    for (let game of longStrike.data) {
      if (game.winner == req.params.userId) {
        currentStreak += 1;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    }
    res.send({ streak: longestStreak });
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

const getUserNickname = async (id) => {
  try {
    const nicknameQuery = await supabase.from("users").select("*").eq("id", id);
    return nicknameQuery;
  } catch (err) {
    console.log(err);
  }
};

// getUserNickname(3).then((res) => {
//   console.log(res.data[0].nickname);
// });

const getUsersMatcheHistory = async (req, res) => {
  const usersHistory = await supabase
    .from("games")
    .select("*")
    .or(`u2_id.eq.${req.params.userId},u1_id.eq.${req.params.userId}`);

  const newlist2 = [];
  for (let i = 0; i < usersHistory.data.length; i++) {
    let name1 = (
      await supabase
        .from("users")
        .select("nickname")
        .eq("id", usersHistory.data[i].u1_id)
    ).data[0].nickname;
    let name2 = (
      await supabase
        .from("users")
        .select("nickname")
        .eq("id", usersHistory.data[i].u2_id)
    ).data[0].nickname;
    let winner = (
      await supabase
        .from("users")
        .select("nickname")
        .eq("id", usersHistory.data[i].winner)
    ).data[0].nickname;
    newlist2.push({
      ...usersHistory.data[i],
      u1Name: name1,
      u2Name: name2,
      winner: winner,
    });
  }
  res.send(newlist2);
};

module.exports = {
  getUsersLongStrike,
  getUsersMatcheHistory,
  addMatche,
  getUserLastScore,
};
