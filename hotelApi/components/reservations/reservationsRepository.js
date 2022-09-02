import connexion from '../../dataBase/dbMysql.js';
import ErrorApi from '../../service/service.ErrorApi.js';


export default class reservationRepository {

    async getOneReservationWithRoomsAndHostelAndCustomerInfo(idReservation){
        try {
            //const [result] = await connexion.execute(`SELECT * FROM reservation where id=?;`, [idReservation]);
            const [result] = await connexion.execute(`SELECT * FROM reservation INNER JOIN customer ON customer.id=reservation.customer_id INNER JOIN reservation_room ON reservation_room.id_reservation=reservation.id INNER JOIN room ON reservation_room.id_room=room.id INNER JOIN hostel ON room.hostel_id=hostel.id WHERE reservation.id=?;`, [idReservation])
            let [count] = await connexion.execute(`SELECT COUNT(*) FROM reservation INNER JOIN reservation_room ON reservation_room.id_reservation=reservation.id WHERE reservation.id=?;`, [idReservation])
            count = count[0]['COUNT(*)'];
            if (result.length == 0){
                throw new ErrorApi(`la réservation ${idReservation} n'existe pas`, 404);
            }
            return {result, count};
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllReservations(start, finished, page, limit){
        try {
            let data = [];
            let where = ``;
            // if (start) {
            //     if (where == "") where += ` WHERE`;
            //     where += ` DATE_FORMAT(start, "%Y-%m-%d")=?`;
            //     data.push(start);
            // }
            // if (finished) {
            //     if (where == "") where += ` WHERE`;
            //     else where += ` AND`;
            //     where += ` DATE_FORMAT(finished, "%Y-%m-%d")=?`;
            //     data.push(finished);
            // }

            if (start && finished) {
                if (where == "") where += ` WHERE`;
                where += ` ((?>= DATE_FORMAT(start, "%Y-%m-%d") AND ? <= DATE_FORMAT(finished, "%Y-%m-%d")) OR (? >=DATE_FORMAT(start, "%Y-%m-%d") AND ? <= DATE_FORMAT(finished, "%Y-%m-%d")) OR (? <=DATE_FORMAT(start, "%Y-%m-%d") AND ?>DATE_FORMAT(finished, "%Y-%m-%d")))`;
                console.log("where", where)
                data.push(start, start, finished, finished, start, finished);
            }
            const [records] = await connexion.execute(`SELECT * FROM reservation INNER JOIN reservation_room ON reservation_room.id_reservation = reservation.id INNER JOIN room ON room.id=reservation_room.id_room INNER JOIN hostel ON hostel.id=room.hostel_id ${where} LIMIT ${limit} OFFSET ${(page - 1) * limit};`, data)
            console.log("resuuult", records);
            // const [records] = await connexion.execute(`SELECT * FROM reservation ${where} LIMIT ${limit} OFFSET ${(page - 1) * limit}`, data);
            // if (records.length === 0){
            //     throw new ErrorApi('il n`y a pas de resultat à cette requete', 404);
            // }
            let [count] = await connexion.execute(`SELECT COUNT(*) FROM reservation ${where}`, data);
            count = count[0]['COUNT(*)'];
            return { records, count };
        } catch (error) {
            console.log(error);
            throw error; 
        }   
    }
    async createOneReservation(start, finished, total, customer_id){

        try {
            console.log(start, finished, total, customer_id)
            const result = await connexion.execute('INSERT INTO reservation (start, finished, total, customer_id) VALUES(?,?,?,?);', [start, finished, total, customer_id]);
            return result[0].insertId;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }
    async createReservationRoomTable(insertId, idRoom){
            try {
                console.log("jskljk", insertId, idRoom);
                const result = await connexion.execute('INSERT INTO reservation_room (id_room, id_reservation) VALUES (?, ?)', [idRoom, insertId]);
                console.log("result", result);
            } catch (error) {
                console.log(error);
                throw error;  
            }
    }

    async deleteOneReservation(idReservation){
        try {
            //exemple avec id 29
            await connexion.execute(`DELETE FROM reservation_room WHERE id_reservation=?`, [idReservation]);
            await connexion.execute(`DELETE FROM reservation WHERE id=?;`, [idReservation]);
        } catch (error) {
            console.log(error);
            throw error;   
        }
    }

    async updateOneReservation(idReservation, newReservation){
        try {
            await connexion.execute(
                'UPDATE reservation SET start = ?, finished = ?, total = ?, customer_id = ? WHERE id=?',
                [newReservation.start, newReservation.finished, newReservation.total, newReservation.customer_id, idReservation]
            );
        } catch (error) {
            console.log(error);
            throw error;
        } 
    }
    
    async getAvailabilityByDate(from, to, page, limit){

        try {
            const [records] = await connexion.execute(`SELECT * FROM reservation INNER JOIN reservation_room ON reservation_room.id_reservation=reservation.id INNER JOIN room ON reservation_room.id_room=room.id INNER JOIN hostel ON room.hostel_id=hostel.id where NOT(( ? >= DATE_FORMAT(start, "%Y-%m-%d") AND ? <= DATE_FORMAT(finished, "%Y-%m-%d")) OR ( ? >=DATE_FORMAT(start, "%Y-%m-%d") AND ? <= DATE_FORMAT(finished, "%Y-%m-%d")) OR ( ? <=DATE_FORMAT(start, "%Y-%m-%d") AND ? >DATE_FORMAT(finished, "%Y-%m-%d"))) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,  [from,from,to,to,from,to])
            let [count] = await connexion.execute(`SELECT COUNT(*) FROM reservation INNER JOIN reservation_room ON reservation_room.id_reservation=reservation.id INNER JOIN room ON reservation_room.id_room=room.id INNER JOIN hostel ON room.hostel_id=hostel.id where NOT(( ? >= DATE_FORMAT(start, "%Y-%m-%d") AND ? <= DATE_FORMAT(finished, "%Y-%m-%d")) OR ( ? >=DATE_FORMAT(start, "%Y-%m-%d") AND ? <= DATE_FORMAT(finished, "%Y-%m-%d")) OR ( ? <=DATE_FORMAT(start, "%Y-%m-%d") AND ? >DATE_FORMAT(finished, "%Y-%m-%d")));`, [from, from, to, to, from, to])
            count = count[0]['COUNT(*)'];
            return { records, count};
        } catch (error) {
            console.log(error);
            throw error;   
        }


    }

    
}
