import ReservationRepo from "./reservationsRepository.js";
const reservationRepository = new ReservationRepo();
import ErrorApi from "../../service/service.ErrorApi.js";
import CustomerRepo from "../customers/customersRepository.js";
const customerRepository = new CustomerRepo();
import data from "../../service/service.dataReponse.js";

export default class reservation {
    /**
       * @api {get} /reservations/:id Request One Reservation with rooms, hostel, customer informations
       * @apiName getOneReservationWithRoomsAndHostelAndCustomerInfo
       * @apiGroup Reservation
       *
       * @apiParam {Int} id Reservation's unique ID.
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
       *   {
                "message": "la réservation 1 n'existe pas",
                "code": 404,
                "status": "error"
            }
       *
       * @apiSuccess {json} data reservation.
       * @apiSuccessExample {json} Success-Response:
       *     HTTP/1.1 200 OK
            {
    "records": {
        "result": [
                    {
                        "id": 29,
                        "start": "2021-09-18T15:41:10.000Z",
                        "finished": "2021-09-23T15:41:10.000Z",
                        "total": "312.1",
                        "customer_id": 100,
                        "firstname": "Liè",
                        "lastname": "Fursland",
                        "email": "kfursland2r@trellian.com",
                        "id_room": 151,
                        "id_reservation": 99,
                        "category": "single",
                        "price": "59e",
                        "breakfastNumber": 2,
                        "option": "smoker",
                        "hostel_id": 29,
                        "name": "hôtel Letta",
                        "adress": "008 Arizona Pass",
                        "zipCode": 75000,
                        "totalRoomNumber": 51,
                        "type": "3 étoiles",
                        "city": "Paris"
                    },
                    {
                        "id": 21,
                        "start": "2021-09-18T15:41:10.000Z",
                        "finished": "2021-09-23T15:41:10.000Z",
                        "total": "312.1",
                        "customer_id": 100,
                        "firstname": "Liè",
                        "lastname": "Fursland",
                        "email": "kfursland2r@trellian.com",
                        "id_room": 44,
                        "id_reservation": 99,
                        "category": "single",
                        "price": "59e",
                        "breakfastNumber": 2,
                        "option": "smoker",
                        "hostel_id": 21,
                        "name": "hôtel Dyane",
                        "adress": "9166 Cambridge Drive",
                        "zipCode": 29200,
                        "totalRoomNumber": 37,
                        "type": "4 étoiles",
                        "city": "Brest"
                    }
                ],
                "count": 2
            },
            "nbRecords": 2,
            "page": {
                "current": 1,
                "previous": null,
                "next": null,
                "last": 1
            }
        }
       */



    async getOneReservationWithRoomsAndHostelAndCustomerInfo(req, res, next) {
      try {
        console.log("jkqhkjdhj", req.params.id)
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
          const record = await reservationRepository.getOneReservationWithRoomsAndHostelAndCustomerInfo(req.params.id);
        res.send(data(record, page, record.count, limit));
      } catch (error) {
        next(error, req, res, next);
      }
    }
    /**
       * @api {get} /reservations/?start=&finished=&page=&limit= get All Reservations informations relate to one period of time
       * @apiName getAllReservations
       * @apiGroup Reservation
       * 
       * @apiParam {Date} [start] first night' s date (format YYYY-MM-DD ("%Y-%m-%d"), ex: 2022-07-21)..
       * @apiParam {Date} [finished] last night' s date (format YYYY-MM-DD ("%Y-%m-%d"), ex: 2022-08-21)..
       * @apiParam {Int} [page=1] the page's number we search.
       * @apiParam {Int} [limit=10] amount of result we search by page.
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
       * @apiError {json} Bad date's format in param
       * @apiErrorExample {json} Error-Response:
       *     HTTP/1.1 400 Not Found
                {
                "message": "attention les parametres de date doivent etre au format YYYY-MM-DD",
                "code": 400,
                "status": "error"
            }
       *
       * @apiSuccess {json} data reservation.
       * @apiSuccessExample {json} Success-Response:
       *     HTTP/1.1 200 OK
        {
    "records": [
                {
                    "id": 22,
                    "start": "2021-10-12T13:49:37.000Z",
                    "finished": "2021-10-16T13:49:37.000Z",
                    "total": "67",
                    "customer_id": 7,
                    "id_room": 453,
                    "id_reservation": 2,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 1,
                    "option": "strongBox",
                    "hostel_id": 22,
                    "name": "hôtel Merci",
                    "adress": "2410 Spenser Place",
                    "zipCode": 13000,
                    "totalRoomNumber": 17,
                    "type": "3 étoiles",
                    "city": "Marseille"
                },
                {
                    "id": 16,
                    "start": "2021-10-05T18:12:57.000Z",
                    "finished": "2021-10-14T18:12:57.000Z",
                    "total": "548.47",
                    "customer_id": 63,
                    "id_room": 168,
                    "id_reservation": 8,
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
                    "id": 9,
                    "start": "2021-10-14T02:46:26.000Z",
                    "finished": "2021-10-24T02:46:26.000Z",
                    "total": "588.92",
                    "customer_id": 23,
                    "id_room": 80,
                    "id_reservation": 17,
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
                    "id": 28,
                    "start": "2021-10-14T21:22:16.000Z",
                    "finished": "2021-10-23T21:22:16.000Z",
                    "total": "538.77",
                    "customer_id": 80,
                    "id_room": 320,
                    "id_reservation": 24,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 2,
                    "option": "travelCot",
                    "hostel_id": 28,
                    "name": "hôtel Jemmie",
                    "adress": "1723 Manley Center",
                    "zipCode": 31000,
                    "totalRoomNumber": 39,
                    "type": "3 étoiles",
                    "city": "Toulouse"
                },
                {
                    "id": 21,
                    "start": "2021-10-10T04:04:17.000Z",
                    "finished": "2021-10-20T04:04:17.000Z",
                    "total": "586.27",
                    "customer_id": 38,
                    "id_room": 312,
                    "id_reservation": 59,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 2,
                    "option": "strongBox",
                    "hostel_id": 21,
                    "name": "hôtel Dyane",
                    "adress": "9166 Cambridge Drive",
                    "zipCode": 29200,
                    "totalRoomNumber": 37,
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
                    "id": 25,
                    "start": "2021-10-13T08:44:30.000Z",
                    "finished": "2021-10-23T08:44:30.000Z",
                    "total": "608.13",
                    "customer_id": 9,
                    "id_room": 174,
                    "id_reservation": 63,
                    "category": "double",
                    "price": "69e",
                    "breakfastNumber": 2,
                    "option": "smoker",
                    "hostel_id": 25,
                    "name": "hôtel Glendon",
                    "adress": "41424 Mesta Center",
                    "zipCode": 59000,
                    "totalRoomNumber": 42,
                    "type": "4 étoiles",
                    "city": "Lille"
                },
                {
                    "id": 19,
                    "start": "2021-09-27T10:07:39.000Z",
                    "finished": "2021-10-13T10:07:39.000Z",
                    "total": "941.38",
                    "customer_id": 64,
                    "id_room": 94,
                    "id_reservation": 90,
                    "category": "double",
                    "price": "69e",
                    "breakfastNumber": 2,
                    "option": "smoker",
                    "hostel_id": 19,
                    "name": "hôtel Brooks",
                    "adress": "5326 Becker Hill",
                    "zipCode": 75000,
                    "totalRoomNumber": 28,
                    "type": "4 étoiles",
                    "city": "Paris"
                }
            ],
            "nbRecords": 7,
            "page": {
                "current": 1,
                "previous": null,
                "next": null,
                "last": 1
            }
        }     
       */
    async getAllReservations(req, res, next) {
    try {
        const start = req.query.start || null; 
        const finished = req.query.finished || null;
        
        const regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        const isADate = regex.test(start) && regex.test(finished);
        if(!isADate&&(start!==null)&&(finished!==null)) {
            throw new ErrorApi(`attention les parametres de date doivent etre au format YYYY-MM-DD`);
        }
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await reservationRepository.getAllReservations(start, finished, page, limit);
        res.send(data(result.records, page, result.count, limit));
    } catch (error) {
        next(error, req, res, next);
    }
 }
    /**
       * @api {put} /reservations/? Create One Reservation 
       * @apiName createOneReservation
       * @apiGroup Reservation
       * 
       * @apiParam {Date} start first night' s date (format YYYY-MM-DD ("%Y-%m-%d"), ex: 2022-07-21)..
       * @apiParam {Date} finished last night's date (format YYYY-MM-DD ("%Y-%m-%d"), ex: 2022-07-21)..
       * @apiParam {Number} total cost ttc.
       * @apiParam {Int} customer_id customer's unique ID.
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
       * @apiError {json} Reservation Not Found
       * @apiErrorExample {json} Error-Response:
       *     HTTP/1.1 404 Not Found
       *     {
       *       "error": "Reservation Not Found."
       *     }
       *
       * @apiSuccess {json} data reservation.
       * @apiSuccessExample {json} Success-Response:
       *     HTTP/1.1 200 OK
            {
                "message": "reservation created",
                "status": 200
            }      
       */
    async createOneReservation(req, res, next) {
        try {
            const {start, finished, total, customer_id, idRooms}= req.body;
            const isCustomerExist = await customerRepository.getOneCustomerById(customer_id);
            if (isCustomerExist){
                const insertId = await reservationRepository.createOneReservation(start, finished, total, customer_id);
                for (let i = 0; i < idRooms.length; i++){
                    // const isRoomExist = await customerRepository.getOneCustomerById(customer_id);
                    if(isRoomExist){
                        await reservationRepository.createReservationRoomTable(insertId, idRooms[i]);
                    }
                }
                res.send({ message: 'reservation created', status: 200 })

            }
        } catch (error) {
            next(error, req, res, next);
        }
    }
    /**
          * @api {delete} /reservations/:id Delete One Reservation 
          * @apiName deleteOneReservation
          * @apiGroup Reservation
          *
          * @apiParam {Int} id Reservation's unique ID.
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
          * @apiError {json} reservation Not Found
          * @apiErrorExample {json} Error-Response:
          *     HTTP/1.1 404 Not Found
          *     {
          *       "error": "Reservation Not Found."
          *     }
          *
          * @apiSuccess {json} data reservation.
          * @apiSuccessExample {json} Success-Response:
          *     HTTP/1.1 200 OK
                {
                    "message": "Reservation deleted successfully",
                    "status": 200
                }      
          */
    async deleteOneReservation(req, res, next){
        try {
            let currentReservation = await reservationRepository.getOneReservationWithRoomsAndHostelAndCustomerInfo(req.params.id);
            if (currentReservation.result.length > 0) {
                await reservationRepository.deleteOneReservation(req.params.id);
                res.json({ message: "Reservation deleted successfully", status: 200 });
            } else {
                throw new ErrorApi(`Room ${req.params.id} n'existe pas`);
            }
        } catch (error) {
            next(error, req, res, next);
        }
    }
    /**
       * @api {put} /reservations/:id Update One Reservation 
       * @apiName updateOneReservation
       * @apiGroup Reservation
       *
       * @apiParam {Int} id Reservation's unique ID.
       * @apiParam {Date} [start] date start(format YYYY-MM-DD ("%Y-%m-%d"), ex: 2022-07-21).
       * @apiParam {Date} [finished] date end (format YYYY-MM-DD ("%Y-%m-%d"), ex: 2022-08-21).
       * @apiParam {Number} [total] Reservation's unique ID.
       * @apiParam {Int} [customer_id] Reservation's unique ID.
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
       *       "error": "Reservation Not Found."
       *     }
       *
       * @apiSuccess {json} data reservation.
       * @apiSuccessExample {json} Success-Response:
       *     HTTP/1.1 200 OK
            {
                "message": "reservation updated",
                "status": 200
            }      
       */

    async updateOneReservation(req, res, next){
        try {
            const { id } = req.params;
            console.log("id", id);

            let currentReservation = await reservationRepository.getOneReservationWithRoomsAndHostelAndCustomerInfo(id);
            
            if (currentReservation.result.length>0) {
                const newReservation = { ...currentReservation.result[0], ...req.body };
                console.log("newReservation", newReservation);
                await reservationRepository.updateOneReservation(id, newReservation);
                res.json({ message: "reservation updated", status: 200 });
            }
        } catch (error) {
            next(error, req, res, next);
        }
    }
    
}
