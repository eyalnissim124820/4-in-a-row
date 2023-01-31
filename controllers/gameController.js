const {io} = require("socket.io-client")
const socket = io("http://localhost:6000");

function createRoom(req, res){
    const gameId = Math.floor(Math.random() * 90000) + 10000
    // console.log(gameId)
    res.send({id: gameId})
}

module.exports = { createRoom };
