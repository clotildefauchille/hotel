import connexion from "../../dataBase/dbMysql.js";
import ErrorApi from "../../service/service.ErrorApi.js";

export default class userRepository {
  async selectById(id) {
    const [rows] = await connexion.execute(
      "SELECT * FROM users WHERE user_id=?",
      [id]
    );
    if (
      typeof rows[0] != "undefined" &&
      typeof rows[0].password != "undefined"
    ) {
      delete rows[0].password; // on n'enverra jamais le password
      return rows[0];
    }
    return {};
  }

  async createOneUser(firstname, lastname, email, hashedPassword, uuid) {
    try {
      const [emailResult] = await connexion.execute(
        `SELECT * FROM user WHERE email=?`,
        [email]
      );
      if (emailResult.length > 0) {
        throw new ErrorApi(`l'utilisateur existe déjà en bdd`);
      } else {
        console.log("uuid", uuid);
        await connexion.execute(
          `INSERT INTO user(firstname, lastname, email, password, uuid) VALUES(?,?,?,?,?);`,
          [firstname, lastname, email, hashedPassword, uuid]
        );
        return { message: "l'utilisateur a été crée" };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByUuid(uuid) {
    try {
      return await connexion.execute(`SELECT * from user WHERE uuid=?`, [uuid]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
