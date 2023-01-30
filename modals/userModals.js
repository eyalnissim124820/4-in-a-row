const dbConnection = require("../knex/knex");

async function getUsersListModal() {
  try {
    const usersListQuery = await dbConnection.from("users").select();
    return usersListQuery;
  } catch (err) {
    console.log(err);
  }
}

async function addUserModal(newUser) {
  try {
    const addedUser = await dbConnection.from("users").insert(newUser);
    return true;
  } catch (err) {
    console.log(err);
  }
}

const getUserByEmailModel = async (email) => {
  try {
    const users = await dbConnection
      .from("users")
      .where({ email: email })
      .first();
    return users;
  } catch (err) {
    console.log(err);
  }
};

const getUserDetailModal = async (userId) => {
  try {
    const userDetailQuery = await dbConnection
      .from("users")
      .where({ userId: userId.userId });

    return userDetailQuery;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addUserModal,
  getUserByEmailModel,
  getUsersListModal,
  getUserDetailModal,
};
