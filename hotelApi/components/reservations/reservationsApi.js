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
       *     {
       *       "error": "Reservation Not Found."
       *     }
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
       * @api {get} /reservations/?start=&finished=&page=&limit= get All Reservations informations
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
    "records": [
            {
                "id": 1,
                "start": "2022-05-07T10:02:53.000Z",
                "finished": "2022-05-13T10:02:53.000Z",
                "total": "352.78",
                "customer_id": 65
            },
            {
                "id": 102,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            },
            {
                "id": 103,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            },
            {
                "id": 104,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            },
            {
                "id": 105,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            },
            {
                "id": 106,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            },
            {
                "id": 107,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            },
            {
                "id": 108,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            },
            {
                "id": 109,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            },
            {
                "id": 110,
                "start": "2022-05-06T22:00:00.000Z",
                "finished": "2022-05-12T22:00:00.000Z",
                "total": "367",
                "customer_id": 4
            }
        ],
        "nbRecords": 17,
        "page": {
            "current": 1,
            "previous": null,
            "next": 2,
            "last": 2
        }
    }      
       */
    async getAllReservations(req, res, next) {
    try {
        const start = req.query.start || null; 
        const finished = req.query.finished || null;
        
        const regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        const isADate = regex.test(start) && regex.test(finished);
        if(!isADate) {
            throw new ErrorApi(`attention les parametre de date doivent etre au format YYYY-MM_DD`);
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
            let currentReservation = await reservationRepository.getOneReservation(req.params.id);
            if (currentReservation) {
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

            let currentReservation = await reservationRepository.getOneReservation(id);
            if (currentReservation) {
                console.log("currentReservation", currentReservation);
                const newReservation = { ...currentReservation, ...req.body };
                console.log("newReservation", newReservation);
                await reservationRepository.updateOneReservation(id, newReservation);
                res.json({ message: "reservation updated", status: 200 });
            }
        } catch (error) {
            next(error, req, res, next);
        }
    }
    
}
