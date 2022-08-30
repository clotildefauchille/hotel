import mysql from 'mysql2';
import RoomsRepo from './roomsRepository.js';
const roomRepository = new RoomsRepo();


export default class Room {

    async getRoom(req, res, next){
        if(isNaN(req.params.id)) {
            next(`id n'est pas correct`, req, res, next);  
        }
        try {
            console.log("inside ", req.params.id);
            res.send(await roomRepository.getOneRoom(req.params.id));   
        } catch (error) {
          next(error.message, req, res, next);  
        }
    }
}