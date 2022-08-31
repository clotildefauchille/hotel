import express from 'express';
const router = express.Router();
import Hostel from './hostelsApi.js';
const hostelApi = new Hostel();


router.get('/:id', hostelApi.getOneHostel);
router.get('', hostelApi.getAllHostels);
router.post('/', hostelApi.createOneHostel);
//TODO Cannot delete or update a parent row: a foreign key constraint fails (`hotel`.`room`, CONSTRAINT `hostel_room` FOREIGN KEY (`hostel_id`) REFERENCES `hostel` (`id`))
router.delete('/:id', hostelApi.deleteOneHostel);
//TODIO tester et creer
router.put('/', hostelApi.updateOneHostel);


// router.get('/:id', roomApi.getOneRoom);
// router.get('/', roomApi.getAllRooms);
// //TODO verifier + ajouter cle etrangere
// router.post('/', roomApi.createOneRoom);
// router.delete('/:id', roomApi.deleteOneRoom);
// //TODIO tester et creer
// router.put('/', roomApi.updateOneRoom);
export default router;