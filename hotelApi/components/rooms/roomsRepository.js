import connexion from '../../dataBase/dbMysql.js';


export default class roomsRepository {

    async getOneRoom(idRoom) {
        console.log("process.env", process.env.DB_USER)
        try {
            const [result] = await connexion.execute(`SELECT * FROM room where id=?;`, [idRoom]);
            console.log("result", result[0]);
            return result[0];
        } catch (error) {
           console.log(ex);
           throw error; 
        }
    }

    async getAllRooms(limit, page) {
        try {
            const [records] = await connexion.execute(`SELECT * FROM room LIMIT ${limit} OFFSET ${(page -1)*limit}`);
             let [count] = await connexion.execute(`SELECT COUNT(*) FROM room`);
             count = count[0]['COUNT(*)'];
            return { records, count};
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }

    async createOneRoom(category, price, breakfastNumber, option){
        try {
            await connexion.execute(`INSERT INTO room(category, price, breakfastNumber, option) VALUES(?,?,?,?);`, [category, price, breakfastNumber, option])
        } catch (error) {
            console.log(ex);
            throw error;  
        }
    }

    async deleteOneRoom(idRoom) {
        try {
            await connexion.execute(`DELETE FROM room WHERE id = ?`, [idRoom]);
        } catch (error) {
            console.log(error);
            throw error;  
        }
    }
}