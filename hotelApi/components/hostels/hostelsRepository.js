import connexion from "../../dataBase/dbMysql.js";
import ErrorApi from '../../service/service.ErrorApi.js';

export default class hostelsRepository {
  async getOneHostel(idHostel) {
    try {
      const [result] = await connexion.execute(
        "SELECT * FROM hostel WHERE id=?",
        [idHostel]
      );
      return result[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllHostels() {
    try {
      const result = await connexion.execute("SELECT * FROM hostel");
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async createOneHostel(name, adress, zipCode, totalRoomNumber, type, city) {
    try {
      const [nameResult] = await connexion.execute(
        `SELECT * FROM hostel WHERE name=?`,
        [name]
      );
      if (nameResult.length > 0) {
          throw new ErrorApi(`l'hotel existe déjà en bdd`, 405);
      } else {
        await connexion.execute(
          `INSERT INTO hostel(name, adress,zipCode,totalRoomNumber,type, city) VALUES(?,?,?,?,?,?);`,
          [name, adress, zipCode, totalRoomNumber, type, city]
        );
        return { message: "l'hôtel a été crée" };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteOneHostel(idHostel) {
    try {
      await connexion.execute(`DELETE FROM hostel WHERE id = ?`, [idHostel]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
