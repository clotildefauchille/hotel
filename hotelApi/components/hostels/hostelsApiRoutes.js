import express from 'express';
const router = express.Router();
import Hostel from './hostelsApi.js';
const hostelApi = new Hostel();

router.get('/availability', hostelApi.getAvailabilityByDate);

router.get('/:id', hostelApi.getOneHostel);
//?city en params et ou name
router.get('/', hostelApi.getAllHostels);


router.post('/', hostelApi.createOneHostel);
//TODO Cannot delete or update a parent row: a foreign key constraint fails (`hotel`.`room`, CONSTRAINT `hostel_room` FOREIGN KEY (`hostel_id`) REFERENCES `hostel` (`id`))
router.delete('/:id', hostelApi.deleteOneHostel);
//TODIO tester et creer
router.put('/', hostelApi.updateOneHostel);


export default router;