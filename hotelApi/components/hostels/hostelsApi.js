import HostelsRepo from './hostelsRepository.js';
const hostelsRepository = new HostelsRepo();


export default class Hostel {
    async getOneHostel(req, res, next){
        try {
            res.send(await hostelsRepository.getOneHostel(req.params.id));
        } catch (error) {
            next(error, req, res, next);
        }
    }
    async getAllHostels(req, res, next){
        try {
            res.send(await hostelsRepository.getAllHostels());
        } catch (error) {
            next(error, req, res, next);
        }
    }
    async createOneHostel(req, res, next) {
        try {
            const {name, adress, zipCode, totalRoomNumber, type, city} = req.body
            const result = await hostelsRepository.createOneHostel(name, adress, zipCode, totalRoomNumber, type, city);
            res.json({message: result.message});
        } catch (error) {
            next(error, req, res, next);
        }
    }
    async deleteOneHostel(req, res, next){
        try {
            await hostelsRepository.deleteOneHostel(req.params.id);
            res.json({message: "hostel deleted"})
        } catch (error) {
            next(error, req, res, next);
        }
    }
    async updateOneHostel(req, res, next){
        //TODO
    }
}