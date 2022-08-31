import uuidAPIKey from 'uuid-apikey';
import RepoUser from '../components/users/usersRepository.js';

const repoUser = new RepoUser();

class AuthApi {
    getAuthByApiKey(req, res, next) {
        // Validation de la clef API, ApiKey : 1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X
        if (typeof req.headers['x-api-key'] == 'undefined' || uuidAPIKey.isAPIKey(req.headers['x-api-key']) !== true) {
            // console.log(uuidAPIKey.toAPIKey('9cc20270-4420-496a-b37e-a741cac6e1da'));
            return res.status(400).json({ error: `La demande n'est pas valide.` });
        }

        // Si la clef est valide, on peut continuer
        const uuid = uuidAPIKey.toUUID(req.headers['x-api-key']);
        repoUser.findByUuid(uuid).then(() => {
            // On permet d'aller à la suite
            // console.log("uuuuid", uuid);

            next();
        }).catch((error) => {
            return res.status(404).json({ error });
        });
    }
}

export default new AuthApi();