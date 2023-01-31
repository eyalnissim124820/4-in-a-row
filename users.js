const users = [];

function joinRoom(id, userName, roomId) {
  const user = { id, userName, roomId };
  users.push(user);
  return user;
}


module.exports = {joinRoom}