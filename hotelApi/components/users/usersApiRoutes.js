import express from 'express';
const router = express.Router();
import UserApi from './usersApi.js';
const user = new UserApi();


// get user By ID
router.get('/:id', user.getUserById);

router.post('/', user.createOneUser);


export default router;