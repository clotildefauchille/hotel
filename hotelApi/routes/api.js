import express from 'express';
import roomsApiRoutes from '../components/rooms/roomsApiRoutes.js';
import hostelApiRoutes from '../components/hostels/hostelsApiRoutes.js';
import reservationApiRoutes from '../components/reservations/reservationsApiRoutes.js';
import customerApiRoutes from '../components/customers/customersApiRoutes.js';
import usersApiRoutes from '../components/users/usersApiRoutes.js';

import serviceAuth from '../service/service.authApi.js';

const router = express.Router();
//receptionne le json
router.use(express.json());

// Gestion des droits API
router.use('/', serviceAuth.getAuthByApiKey);

// ... chargement de vos prochaines routes ici
router.use('/users', usersApiRoutes);

router.use('/rooms', roomsApiRoutes);

router.use('/hostels', hostelApiRoutes);

router.use ('/reservations', reservationApiRoutes);

router.use('/customers', customerApiRoutes);

router.use((error, req, res, next) => { 
   res.status(error.code || 400).json({message : error.message, code: error.code, status: 'error'}); 
});
// Si une route n'existe pas, erreur 404
router.route("*").all((req, res) => { res.status(404).send(); });

export default router;