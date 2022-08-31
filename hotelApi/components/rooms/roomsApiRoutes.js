import express from 'express';
const router= express.Router();
import Room from './roomsApi.js';
const roomApi= new Room();


router.get('/:id', roomApi.getOneRoom);
router.get('/', roomApi.getAllRooms);
//TODO verifier + ajouter cle etrangere
router.post('/', roomApi.createOneRoom);
router.delete('/:id', roomApi.deleteOneRoom);
//TODIO tester et creer
router.put('/', roomApi.updateOneRoom);

export default router;