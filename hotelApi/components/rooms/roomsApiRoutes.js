
import express from 'express';
const router= express.Router();
import Room from './roomsApi.js';
const roomApi= new Room();


router.get('/:id', roomApi.getRoom);

export default router;