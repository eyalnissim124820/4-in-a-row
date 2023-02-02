const colorSupport = require("color-support");
const { map } = require("lodash");
const supabase = require("../db/config");
const jwt = require("jsonwebtoken");

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
    if (winner) {
      const newScoreWn =
        (await supabase.from("users").select("score").eq("id", winner)).data[0]
          .score + 2;
      const changeUserScore = await supabase
        .from("users")
        .update({ score: newScoreWn })
        .eq("id", winner);
    } else {
      const newScoreU1 =
        (await supabase.from("users").select("score").eq("id", u1_id)).data[0]
          .score + 1;
      const changeUser1Score = await supabase
        .from("users")
        .update({ score: newScoreU1 })
        .eq("id", u1_id);
      const newScoreU2 =
        (await supabase.from("users").select("score").eq("id", u2_id)).data[0]
          .score + 1;
      const changeUser2Score = await supabase
        .from("users")
        .update({ score: newScoreU2 })
        .eq("id", u2_id);
    }
    res.send("hello");
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUsersMatcheHistory = async (req, res) => {
  const usersHistory = await supabase
    .from("games")
    .select("*")
    .or(`u2_id.eq.${req.params.userId},u1_id.eq.${req.params.userId}`);

  const revUsersHistory = usersHistory.data.reverse();
  const newlist2 = [];
  for (let i = 0; i < revUsersHistory.length; i++) {
    let name1 = (
      await supabase
        .from("users")
        .select("nickname")
        .eq("id", revUsersHistory[i].u1_id)
    ).data[0].nickname;
    let name2 = (
      await supabase
        .from("users")
        .select("nickname")
        .eq("id", revUsersHistory[i].u2_id)
    ).data[0].nickname;
    let winner = (
      await supabase
        .from("users")
        .select("nickname")
        .eq("id", revUsersHistory[i].winner)
    ).data[0].nickname;
    newlist2.push({
      ...revUsersHistory[i],
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
