import connexion from '../../dataBase/dbMysql.js';


export default class roomsRepository {

    async getOneRoom(idRoom) {
        console.log("hellllo", idRoom);
        console.log("process.env", process.env.DB_NAME)

        const result = await connexion.execute(`SELECT * FROM room where id=?;`, [idRoom]);
        console.log("result", result);
        return result;
    }
}