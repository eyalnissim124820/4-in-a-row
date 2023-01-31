const {io} = require("socket.io-client")
const socket = io("http://localhost:6000");

function createRoom(req, res){
    const gameId = Math.floor(Math.random() * 9000) + 1000
    // console.log(gameId)
    res.send({id: gameId})
}

module.exports = { createRoom };
