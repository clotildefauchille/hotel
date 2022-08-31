import RepoUser from './usersRepository.js';
const repoUser = new RepoUser();
import bcrypt from 'bcrypt';
import uuidAPIKey from 'uuid-apikey';

export default class User {

    async getUserById(req, res) {
        if (isNaN(req.params.id)) {
            next(`id n'est pas correct`, req, res, next);
        }
        try {
            const data = await repoUser.selectById(req.params.id);
            return res.send(data);
        } catch (error) {
            next(error, req, res, next);
        }
    }
    async createOneUser(req, res, next){

    
        try {
            const {firstname, lastname, email} = req.body;
            const uuid = uuidAPIKey.create().uuid;
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const result = await repoUser.createOneUser(firstname, lastname, email, hashedPassword, uuid);
            res.json({ message: result.message });
        } catch (error) {
            next(error, req, res, next);
        }
    }
}
