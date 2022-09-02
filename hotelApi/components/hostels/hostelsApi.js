import HostelsRepo from './hostelsRepository.js';
const hostelsRepository = new HostelsRepo();
import data from "../../service/service.dataReponse.js";
import ReservationRepo from '../reservations/reservationsRepository.js';
const reservationRepository = new ReservationRepo();

export default class Hostel {

    /**
         * @api {get} /hostels/:id Request One Hostel information
         * @apiName getOneHostel
         * @apiGroup Hostel
         *
         * @apiParam {Number} id Hostel's unique ID.
         *
         * @apiHeader {String} authorization x-api-key <API_KEY>.
         * @apiHeaderExample {json} Header-Example:
         *     {
         *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
         *     }
         *
         * @apiError {json} apikey incorrecte
         * @apiErrorExample {json} Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {"error":"Bad Request"}
         *
         * @apiError {json} Room Not Found
         * @apiErrorExample {json} Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "message": "l'hotel avec l'id : 978999 n'existe pas",
         *       "code": 400,
         *       "status": "error"
         *       }
         *
         * @apiSuccess {json} data room.
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *       {
         *           "records": {
         *               "name": "hôtel Sloane",
         *               "id": 8,
         *               "zipCode": 31000,
         *               "adress": "81972 Independence Hill",
         *               "totalRoomNumber": 41,
         *               "type": "4 étoiles",
         *               "city": "Toulouse"
         *           },
         *           "nbRecords": 1,
         *           "page": {
         *               "current": 1,
         *               "previous": null,
         *               "last": 1
         *               "next": null,
         *           }
         *       }
         */

    
    async getOneHostel(req, res, next){
        try {
            const records = await hostelsRepository.getOneHostel(req.params.id);
            res.send(data(records));
        } catch (error) {
            next(error, req, res, next);
        }
    }
    /**
        * @api {get} /hostels/?city=&name=&page=&limit= Request All Hostel information
        * @apiName getAllHostel
        * @apiGroup Hostel
        *
        * @apiParam {String} city city's name from France.
        * @apiParam {String} name Hostel's name.
        * @apiParam {Int} [page=1] the page searched.
        * @apiParam {Int} [limit=10] number of item per page searched.
        *
        * @apiHeader {String} authorization x-api-key <API_KEY>.
        * @apiHeaderExample {json} Header-Example:
        *     {
        *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
        *     }
        *
        * @apiError {json} apikey incorrecte
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {"error":"Bad Request"}
        *
        * @apiError {json} Room Not Found
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 404 Not Found
        *     {
        *       "status": "error"
        *      }
        *
        * @apiSuccess {json} data room.
        * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
               {
                "records": [
                    {
                        "id": 5,
                        "name": "hôtel Elita",
                        "adress": "94217 Barnett Park",
                        "zipCode": 75000,
                        "totalRoomNumber": 35,
                        "type": "4 étoiles",
                        "city": "Paris"
                    },
                    {
                        "id": 13,
                        "name": "hôtel Kirk",
                        "adress": "49028 Lakewood Park",
                        "zipCode": 75000,
                        "totalRoomNumber": 27,
                        "type": "4 étoiles",
                        "city": "Paris"
                    },
                    {
                        "id": 19,
                        "name": "hôtel Brooks",
                        "adress": "5326 Becker Hill",
                        "zipCode": 75000,
                        "totalRoomNumber": 28,
                        "type": "4 étoiles",
                        "city": "Paris"
                    },
                    {
                        "id": 24,
                        "name": "hôtel Phaedra",
                        "adress": "41790 Bultman Avenue",
                        "zipCode": 75000,
                        "totalRoomNumber": 38,
                        "type": "4 étoiles",
                        "city": "Paris"
                    },
                    {
                        "id": 29,
                        "name": "hôtel Letta",
                        "adress": "008 Arizona Pass",
                        "zipCode": 75000,
                        "totalRoomNumber": 51,
                        "type": "3 étoiles",
                        "city": "Paris"
                    }
                ],
                "nbRecords": 6,
                "page": {
                    "current": "1",
                    "previous": null,
                    "next": "11",
                    "last": 2
                }
            }
        */   

    async getAllHostels(req, res, next){
        try {
            const city = req.query.city || null;
            const name = req.query.name || null;
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const result = await hostelsRepository.getAllHostels(city, name, page, limit);
            res.send(data(result.records, page, result.count, limit));
        } catch (error) {
            next(error, req, res, next);
        }
    }
      /**
        * @api {post} /hostels Create one Hostel
        * @apiName createOneHostel
        * @apiGroup Hostel
        *
        * @apiParam {String} name hostel's name.
        * @apiParam {String} Hostel's adress.
        * @apiParam {Int} zipCode hostel's zip code.
        * @apiParam {Int} totalRoomNumber number of room in the hostel.
        * @apiParam {String} type ex: 2 étoiles..
        * @apiParam {String} city hostel's city.
        *
        * @apiHeader {String} authorization x-api-key <API_KEY>.
        * @apiHeaderExample {json} Header-Example:
        *     {
        *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
        *     }
        *
        * @apiError {json} apikey incorrecte
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {"error":"Bad Request"}
        *
        * @apiError {json} Room Not Found
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 404 Not Found
        *     {
        *       "status": "error"
        *      }
        *
        * @apiSuccess {json} data room.
        * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
            {
                "message": "l'hôtel a été crée"
            }
        */  
    async createOneHostel(req, res, next) {
        try {
            const {name, adress, zipCode, totalRoomNumber, type, city} = req.body
            const result = await hostelsRepository.createOneHostel(name, adress, zipCode, totalRoomNumber, type, city);
            res.json({message: result.message});
        } catch (error) {
            next(error, req, res, next);
        }
    }
    async deleteOneHostel(req, res, next){
        try {
            //appel au repo room supprimer ttesles rooms de l'hotel
            await hostelsRepository.deleteOneHostel(req.params.id);
            res.json({message: "hostel deleted"})
        } catch (error) {
            next(error, req, res, next);
        }
    }
    async updateOneHostel(req, res, next){
        //TODO
    }

    /**
   * @api {get} /hostels/availability?from=&to=&page=&limit= Get availability from a period
   * @apiName getAvailabilityByDate
   * @apiGroup Hostel
   *
   * @apiParam {Date} from the start of the date (format YYYY-MM-DD ("%Y-%m-%d"), ex: 2022-07-21).
   * @apiParam {Date} to the end of the date (format YYYY-MM-DD ("%Y-%m-%d").
   * @apiParam {Int} [page=1] the page searched.
   * @apiParam {Int} [limit=10] number of item per page searched.
   *
   * @apiHeader {String} authorization x-api-key <API_KEY>.
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
   *     }
   *
   * @apiError {json} apikey incorrecte
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 400 Bad Request
   *     {"error":"Bad Request"}
   *
   * @apiError {json} Room Not Found
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "status": "error"
   *      }
   *
   * @apiSuccess {json} data room.
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
       {
    "records": [
                {
                    "id": 5,
                    "start": "2021-12-09T00:42:02.000Z",
                    "finished": "2021-12-11T00:42:02.000Z",
                    "total": "111.36",
                    "customer_id": 30,
                    "id_room": 165,
                    "id_reservation": 36,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 1,
                    "option": "travelCot",
                    "hostel_id": 5,
                    "name": "hôtel Elita",
                    "adress": "94217 Barnett Park",
                    "zipCode": 75000,
                    "totalRoomNumber": 35,
                    "type": "4 étoiles",
                    "city": "Paris"
                },
                {
                    "id": 8,
                    "start": "2021-09-23T14:15:58.000Z",
                    "finished": "2021-09-29T14:15:58.000Z",
                    "total": "358.67",
                    "customer_id": 34,
                    "id_room": 299,
                    "id_reservation": 38,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 2,
                    "option": "travelCot",
                    "hostel_id": 8,
                    "name": "hôtel Sloane",
                    "adress": "81972 Independence Hill",
                    "zipCode": 31000,
                    "totalRoomNumber": 41,
                    "type": "4 étoiles",
                    "city": "Toulouse"
                },
                {
                    "id": 9,
                    "start": "2021-09-14T14:30:02.000Z",
                    "finished": "2021-09-25T14:30:02.000Z",
                    "total": "647.82",
                    "customer_id": 46,
                    "id_room": 156,
                    "id_reservation": 50,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 2,
                    "option": "strongBox",
                    "hostel_id": 9,
                    "name": "hôtel Ernestus",
                    "adress": "82 Crest Line Court",
                    "zipCode": 59000,
                    "totalRoomNumber": 42,
                    "type": "4 étoiles",
                    "city": "Lille"
                },
                {
                    "id": 4,
                    "start": "2021-12-02T11:13:51.000Z",
                    "finished": "2021-12-09T11:13:51.000Z",
                    "total": "408.32",
                    "customer_id": 16,
                    "id_room": 487,
                    "id_reservation": 23,
                    "category": "double",
                    "price": "69e",
                    "breakfastNumber": 1,
                    "option": "travelCot",
                    "hostel_id": 4,
                    "name": "hôtel Jami",
                    "adress": "410 Cherokee Court",
                    "zipCode": 33063,
                    "totalRoomNumber": 15,
                    "type": "4 étoiles",
                    "city": "Bordeaux"
                },
                {
                    "id": 18,
                    "start": "2022-04-04T01:33:04.000Z",
                    "finished": "2022-04-05T01:33:04.000Z",
                    "total": "64.27",
                    "customer_id": 56,
                    "id_room": 30,
                    "id_reservation": 94,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 2,
                    "option": "travelCot",
                    "hostel_id": 18,
                    "name": "hôtel Oona",
                    "adress": "32 Texas Parkway",
                    "zipCode": 13000,
                    "totalRoomNumber": 42,
                    "type": "3 étoiles",
                    "city": "Marseille"
                },
                {
                    "id": 28,
                    "start": "2021-10-30T09:47:50.000Z",
                    "finished": "2021-11-15T10:47:50.000Z",
                    "total": "965.72",
                    "customer_id": 92,
                    "id_room": 422,
                    "id_reservation": 67,
                    "category": "double",
                    "price": "69e",
                    "breakfastNumber": 1,
                    "option": "smoker",
                    "hostel_id": 28,
                    "name": "hôtel Jemmie",
                    "adress": "1723 Manley Center",
                    "zipCode": 31000,
                    "totalRoomNumber": 39,
                    "type": "3 étoiles",
                    "city": "Toulouse"
                },
                {
                    "id": 7,
                    "start": "2021-10-14T02:46:26.000Z",
                    "finished": "2021-10-24T02:46:26.000Z",
                    "total": "588.92",
                    "customer_id": 23,
                    "id_room": 22,
                    "id_reservation": 17,
                    "category": "double",
                    "price": "69e",
                    "breakfastNumber": 1,
                    "option": "travelCot",
                    "hostel_id": 7,
                    "name": "hôtel Casper",
                    "adress": "70802 Hintze Avenue",
                    "zipCode": 31000,
                    "totalRoomNumber": 30,
                    "type": "3 étoiles",
                    "city": "Toulouse"
                },
                {
                    "id": 6,
                    "start": "2021-11-26T14:26:10.000Z",
                    "finished": "2021-11-27T14:26:10.000Z",
                    "total": "61.94",
                    "customer_id": 54,
                    "id_room": 482,
                    "id_reservation": 39,
                    "category": "double",
                    "price": "69e",
                    "breakfastNumber": 1,
                    "option": "smoker",
                    "hostel_id": 6,
                    "name": "hôtel Jourdan",
                    "adress": "9 Schurz Point",
                    "zipCode": 29200,
                    "totalRoomNumber": 44,
                    "type": "4 étoiles",
                    "city": "Brest"
                },
                {
                    "id": 16,
                    "start": "2021-10-13T08:44:30.000Z",
                    "finished": "2021-10-23T08:44:30.000Z",
                    "total": "608.13",
                    "customer_id": 9,
                    "id_room": 84,
                    "id_reservation": 63,
                    "category": "double",
                    "price": "69e",
                    "breakfastNumber": 2,
                    "option": "travelCot",
                    "hostel_id": 16,
                    "name": "hôtel Kory",
                    "adress": "4420 Pond Trail",
                    "zipCode": 31000,
                    "totalRoomNumber": 31,
                    "type": "4 étoiles",
                    "city": "Toulouse"
                },
                {
                    "id": 6,
                    "start": "2021-10-18T13:15:56.000Z",
                    "finished": "2021-10-24T13:15:56.000Z",
                    "total": "382.14",
                    "customer_id": 50,
                    "id_room": 318,
                    "id_reservation": 41,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 1,
                    "option": "smoker",
                    "hostel_id": 6,
                    "name": "hôtel Jourdan",
                    "adress": "9 Schurz Point",
                    "zipCode": 29200,
                    "totalRoomNumber": 44,
                    "type": "4 étoiles",
                    "city": "Brest"
                }
            ],
            "nbRecords": 57,
            "page": {
                "current": "2",
                "previous": 1,
                "next": "21",
                "last": 6
            }
        }
   */  
    async getAvailabilityByDate(req, res, next){
        const {from, to} = req.query;
        
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await reservationRepository.getAvailabilityByDate(from, to, page, limit);
        res.send(data(result.records, page, result.count, limit))
    }
}