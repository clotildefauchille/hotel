import connexion from '../../dataBase/dbMysql.js';
import ErrorApi from '../../service/service.ErrorApi.js';

export default class customerRepository {


    async getOneCustomerById(idCustomer){
        try {
            console.log(idCustomer);
            const [result] = await connexion.execute('SELECT * FRO customer WHERE id=?', [idCustomer]);
            console.log(result);
            if(result.length === 0){
                throw new ErrorApi(`il n'existe pas de client ac l'id ${idCustomer}`)
            }
            return result[0]
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getAllCustomer(email, page, limit) {
        try {
            console.log("email", email);
            let data = [];
            let where = ``;
            if (email) {
                if (where == "") where += ` WHERE`;
                where += ` email=?`;
                data.push(email);
            }
            const [records] = await connexion.execute(
                `SELECT * FROM customer ${where} LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
                data
            );
            let [count] = await connexion.execute(`SELECT COUNT(*) FROM customer ${where}`, data);
            count = count[0]['COUNT(*)'];
            return { records, count };
        } catch (error) {
            console.log("hello", error);
            throw error;
        }

    }
}

