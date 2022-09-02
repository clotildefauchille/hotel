import express from 'express';
const router = express.Router();
import Reservation from './reservationsApi.js';
const reservationsApi = new Reservation();

router.get('/:id', reservationsApi.getOneReservationWithRoomsAndHostelAndCustomerInfo);

router.get('/', reservationsApi.getAllReservations);

router.post('/', reservationsApi.createOneReservation);

router.delete('/:id', reservationsApi.deleteOneReservation);

router.put('/:id', reservationsApi.updateOneReservation);
export default router;