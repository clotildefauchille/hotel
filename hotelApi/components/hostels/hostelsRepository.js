import connexion from "../../dataBase/dbMysql.js";
import ErrorApi from "../../service/service.ErrorApi.js";

export default class hostelsRepository {
  async getOneHostel(idHostel) {
    try {
      const [result] = await connexion.execute(
        "SELECT * FROM hostel WHERE id=?",
        [idHostel]
      );
      if(result.length == 0) {
        throw new ErrorApi(`l'hotel avec l'id : ${idHostel} n'existe pas`);
      }
      return result[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllHostels(city, name, page, limit) {
    try {
      let data = [];
      let where = ``;
      if (city) {
        if (where == "") where += ` WHERE`;
        where += ` city=?`;
        data.push(city);
      }
      if (name) {
        if (where == "") where += ` WHERE`;
        else where += ` AND`;
        where += ` name=? `;
        data.push(name);
      }
      const [records] = await connexion.execute(
        `SELECT * FROM hostel ${where} LIMIT ${limit} OFFSET ${(page - 1) * limit} `,
        data
      );
      let [count] = await connexion.execute(`SELECT COUNT(*) FROM hostel ${where}`, data);
      count = count[0]['COUNT(*)'];
      return { records, count };
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
        throw new ErrorApi(`l'hotel existe déjà en bdd`);
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
