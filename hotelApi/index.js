import dotenv from 'dotenv';
import express from 'express';
import router from './routes/api.js';

// pour permettre le chargement des variables d'environnement
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV.trim()}` : '.env' });

const app = express();


// permet de parser le contenu du body des requêtes,
// l'option extended true permet de parser les objets
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------------------------------
//      Chargement des routes liées à l'API
//--------------------------------------------------------------------
app.use('/api', router);

//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT, () => {
    console.log(`Le serveur est démarré : <http://localhost>:${process.env.PORT}`);
});

export default app;