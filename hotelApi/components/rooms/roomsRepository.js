import connexion from '../../dataBase/dbMysql.js';
import ErrorApi from '../../service/service.ErrorApi.js';

export default class roomsRepository {

    async getOneRoom(idRoom) {
        try {
            const [result] = await connexion.execute(`SELECT * FROM room INNER JOIN hostel ON hostel.id=room.hostel_id where room.id=?;`, [idRoom]);
            if(result.length===0) {
                throw new ErrorApi(`Room ${idRoom} n'existe pas`, 404)
            }
            return result[0];
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllRooms(limit, page, hostel_id) {
        try {
            let data = [];
            let where = ``;
            if (hostel_id) {
                if (where == "") where += ` WHERE`;
                where += ` hostel_id=?`;
                data.push(hostel_id);
            }
            const [records] = await connexion.execute(`SELECT * FROM room ${where} LIMIT ${limit} OFFSET ${(page - 1) * limit}`, data);
            let [count] = await connexion.execute(`SELECT COUNT(*) FROM room ${where}`, data);
            count = count[0]['COUNT(*)'];
            return { records, count };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createOneRoom(category, price, breakfastNumber, option, hostel_id) {
        try {
                await connexion.execute("INSERT INTO room(category, price, breakfastNumber, `option`, hostel_id) VALUES(?,?,?,?,?);", [category, price, breakfastNumber, option, hostel_id])
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateOneRoom(idRoom, newRoom) {
        try {
            await connexion.execute(
                'UPDATE room SET category = ?, price = ?, breakfastNumber = ?, `option` = ? WHERE id=?',
                [newRoom.category, newRoom.price, newRoom.breakfastNumber, newRoom.option, idRoom]
            );
        } catch (error) {
            console.log(error);
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