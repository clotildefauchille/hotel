import express from 'express';
import roomsApiRoutes from '../components/rooms/roomsApiRoutes.js';
const router = express.Router();

// ... chargement de vos prochaines routes ici
router.use('/rooms', roomsApiRoutes);


router.use((error, req, res, next) => { 
   console.log('ouaip y a une erreur');
   res.json({message : error, status: 'error'}); 
});
// Si une route n'existe pas, erreur 404
router.route("*").all((req, res) => { res.status(404).send(); });

export default router;