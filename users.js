
function joinRoom(id, userName, roomId) {
  const user = { id, userName, roomId };
  users.push(user);
  return user;
}

function startGame(arr, roomId){
  arr.forEach(element => {
    if(roomId == element.roomId){
      console.log("here")
      console.log(roomId , element.roomId)
      return true
    }
  });
}


module.exports = {joinRoom, startGame}