import ReservationRepo from "./reservationsRepository.js";
const reservationRepository = new ReservationRepo();

export default class reservation {

    async getOneReservation(req, res, next) {
        if (isNaN(req.params.id)) {
            next(`id n'est pas correct`, req, res, next);
        }
        try {
            res.send(await reservationRepository.getOneReservation(req.params.id));
        } catch (error) {
            next(error, req, res, next);
        }
    }
}