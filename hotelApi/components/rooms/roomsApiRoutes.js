import express from 'express';
const router= express.Router();
import Room from './roomsApi.js';
const roomApi= new Room();


router.get('/:id', roomApi.getOneRoom);
//TODO gestion erreur si mauvais id hotel
router.get('/', roomApi.getAllRooms);
router.post('/', roomApi.createOneRoom);
router.delete('/:id', roomApi.deleteOneRoom);
router.put('/:id', roomApi.updateOneRoom);

export default router;