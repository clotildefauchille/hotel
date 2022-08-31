import connexion from '../../dataBase/dbMysql.js';


export default class reservationRepository {
    async getOneReservation(idReservation){
        try {
            const [result] = await connexion.execute(`SELECT * FROM reservation where id=?;`, [idReservation]);
            return result[0];
        } catch (error) {
            console.log(ex);
            throw error;
        }
    }
}