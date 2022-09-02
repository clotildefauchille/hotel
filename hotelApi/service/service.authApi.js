import uuidAPIKey from 'uuid-apikey';
import RepoUser from '../components/users/usersRepository.js';
import ErrorApi from './service.ErrorApi.js';

const repoUser = new RepoUser();

class AuthApi {
    getAuthByApiKey(req, res, next) {
        // Validation de la clef API, ApiKey : 1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X
        if (typeof req.headers['x-api-key'] == 'undefined' || uuidAPIKey.isAPIKey(req.headers['x-api-key']) !== true) {
            next(new ErrorApi(`La demande n'est pas valide.`, 401))
        }
        // Si la clef est valide, on peut continuer
        const uuid = uuidAPIKey.toUUID(req.headers['x-api-key']);
        repoUser.findByUuid(uuid).then(() => {
            // On permet d'aller à la suite
            next();
        }).catch((error) => {
            next(error, req, res, next);
        });
    }
}

export default new AuthApi();