import mysql from 'mysql2';
import RoomsRepo from './roomsRepository.js';
const roomRepository = new RoomsRepo();


export default class Room {

    getRoom(req, res){

        console.log("inside ", req.params.id);
        res.send(roomRepository.getOneRoom(req.params.id))
        // const db = mysql.createConnection({
        //     host: process.env.DB_HOST,
        //     user: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        //     database: process.env.DB_NAME,
        // });

    // db.connect(function (err) {
    //     if (err) throw err;
    //     console.log("Connecté à la base de données MySQL!");
    //     db.query(`SELECT * FROM room where id=${idRoom};`, function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //     });
    // });
    }
}