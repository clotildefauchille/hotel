import RoomsRepo from "./roomsRepository.js";
import data from '../../service/service.dataReponse.js';
const roomRepository = new RoomsRepo();



export default class Room {

  /**
     * @api {get} /rooms/:id Request One Room information
     * @apiName getOneRoom
     * @apiGroup Room
     *
     * @apiParam {Number} id Room's unique ID.
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
     *       "error": "Room Not Found."
     *     }
     *
     * @apiSuccess {json} data room.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
                {
                  "records": {
                    "id": 50,
                    "category": "single",
                    "price": "59e",
                    "breakfastNumber": 2,
                    "option": "strongBox",
                    "hostel_id": 1
                  },
                  "nbRecords": 1,
                  "page": {
                      "current": 1,
                      "previous": null,
                      "next": null,
                      "last": 1
                  }
              }
     */

  /**
* @api {get} /rooms?page=2&count=4&limit=5 Request All Rooms information
* @apiName getAllRooms
* @apiGroup Room
*
* @apiParam {Int} page the page's number we search (optionnal query string).
* @apiParam {Int} count Total of result on request (optionnal query string).
* @apiParam {Int} limit amount of result we search by page (optionnal query string).
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
*       "error": "Room Not Found."
*     }
*
* @apiSuccess {json} data room.
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
    {
    "records": [
        {
            "id": 6,
            "category": "single",
            "price": "59e",
            "breakfastNumber": 2,
            "option": "travelCot",
            "hostel_id": 6
        },
        {
            "id": 7,
            "category": "single",
            "price": "59e",
            "breakfastNumber": 1,
            "option": "travelCot",
            "hostel_id": 28
        },
        {
            "id": 8,
            "category": "double",
            "price": "69e",
            "breakfastNumber": 1,
            "option": "strongBox",
            "hostel_id": 5
        },
        {
            "id": 9,
            "category": "single",
            "price": "59e",
            "breakfastNumber": 1,
            "option": "travelCot",
            "hostel_id": 13
        },
        {
            "id": 10,
            "category": "single",
            "price": "59e",
            "breakfastNumber": 2,
            "option": "strongBox",
            "hostel_id": 26
        }
    ],
    "nbRecords": 499,
    "page": {
        "current": "2",
        "previous": 1,
        "next": "21",
        "last": 100
    }
}
*/

  async getOneRoom(req, res, next) {
    if (isNaN(req.params.id)) {
      next(`id n'est pas correct`, req, res, next);
    }
    try {
      const records = await roomRepository.getOneRoom(req.params.id);
      return res.send(data(records));
    } catch (error) {
      next(error, req, res, next);
    }
  }

  async getAllRooms(req, res, next) {
    try {
      let { page, limit } = req.query;
      const result = await roomRepository.getAllRooms(limit, page);
      return res.send(data(result.records, page, result.count, limit));
    } catch (error) {
      next(error, req, res, next);
    }
  }

  async createOneRoom(req, res, next) {
    try {

      const { category, price, breakfastNumber, option } = req.body;
      await roomsRepository.createOneRoom(
        category,
        price,
        breakfastNumber,
        option
      );
      res.json({ message: "room created" });
    } catch (error) {
      next(error, req, res, next);
    }
  }

  async deleteOneRoom(req, res, next) {
    try {
      if (isNaN(req.params.id)) {
        next(`id n'est pas correct`, req, res, next);
      }
      await roomRepository.deleteOneRoom(req.params.id);
      res.json({ message: 'Room deleted successfully' })
    } catch (error) {
      next(error, req, res, next);
    }
  }

  async updateOneRoom(req, res, next) {
    // try {
    //     const { } = req.body
    //     await roomsRepository.updateOneHostel();
    //     res.json({ message: "room updated" }) 
    // } catch (error) {
    //     next(error, req, res, next);
    // }
  }
}
