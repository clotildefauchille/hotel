import express from 'express';
const router = express.Router();
import Customer from './customersApi.js';
const customerApi = new Customer();


router.get('/:id', customerApi.getOneCustomerById);
router.get('/', customerApi.getAllCustomer);



export default router;