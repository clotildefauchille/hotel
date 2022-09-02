import RoomsRepo from "./roomsRepository.js";
import data from "../../service/service.dataReponse.js";
import ErrorApi from "../../service/service.ErrorApi.js";
const roomsRepository = new RoomsRepo();
import HostelRepo from "../hostels/hostelsRepository.js";
const hostelsRepository = new HostelRepo();

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
              "id": 15,
              "category": "single",
              "price": "59e",
              "breakfastNumber": 2,
              "option": "none",
              "hostel_id": 15,
              "name": "hôtel Courtnay",
              "adress": "86 Macpherson Plaza",
              "zipCode": 31000,
              "totalRoomNumber": 49,
              "type": "3 étoiles",
              "city": "Toulouse"
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

  async getOneRoom(req, res, next) {
    if (isNaN(req.params.id)) {
      next(`id n'est pas correct`, req, res, next);
    }
    try {
      const records = await roomsRepository.getOneRoom(req.params.id);
      return res.send(data(records));
    } catch (error) {
      next(error, req, res, next);
    }
  }
  /**
     * @api {get} /rooms/?page=&limit=&hostel_id Request All Rooms information
     * @apiName getAllRooms
     * @apiGroup Room
     *
     * @apiParam {Int} [page=1] the page's number we search. 
     * @apiParam {Int} [limit=10] amount of result we search by page.
     * @apiParam {Int} [hostel_id] hostel's id.
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
  async getAllRooms(req, res, next) {
    try {
      const hostel_id = req.query.hostel_id || null;
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      console.log("hostel_id", hostel_id);
      const result = await roomsRepository.getAllRooms(limit, page, hostel_id);
      return res.send(data(result.records, page, result.count, limit));
    } catch (error) {
      next(error, req, res, next);
    }
  }

  /**
     * @api {post} /rooms Create One Room
     * @apiName createOneRoom
     * @apiGroup Room
     *
     * @apiParam {String} [category] if the room is a single or a double.
     * @apiParam {String} [price] price per night.
     * @apiParam {Int} [breakfastNumber] number of breakfast per room.
     * @apiParam {String} [option] none, tv, ...
     * @apiParam {Int} [hostel_id] hostel's id.
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
     * @apiError {json} bad hostel_id
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
                "message": "l'hotel avec l'id : 11111 n'existe pas",
                "code": 400,
                "status": "error"
            }
     *
     * @apiSuccess {json} data room.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
                {
                    "message": "room created",
                    "status": 200
                }
     */

  async createOneRoom(req, res, next) {
    try {
      let { category, price, breakfastNumber, option, hostel_id } = req.body;
      const isHostelExist = await hostelsRepository.getOneHostel(hostel_id);
      if (isHostelExist) {
        await roomsRepository.createOneRoom(
          category,
          price,
          breakfastNumber,
          option,
          hostel_id
        );
        res.json({ message: "room created", status: 200 });
      }
    } catch (error) {
      next(error, req, res, next);
    }
  }
  /**
     * @api {delete} /rooms/:id Delete One Room
     * @apiName deleteOneRoom
     * @apiGroup Room
     *
     * @apiParam {Int} id Room's unique ID.
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
     * @apiError {json} Bad id room
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *         "message": "Room 888888 n'existe pas",
     *         "code": 404,
     *         "status": "error"
     *       }
     * @apiSuccess {json} data room.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
                {
                    "message": "Room deleted successfully",
                    "status": 200
                }
     */

  async deleteOneRoom(req, res, next) {
    try {
      if (isNaN(req.params.id)) {
        next(`id n'est pas correct`, req, res, next);
      }
      let currentRoom = await roomsRepository.getOneRoom(req.params.id);
      if (currentRoom) {
        await roomsRepository.deleteOneRoom(req.params.id);
        res.json({ message: "Room deleted successfully", status: 200 });
      } else {
        throw new ErrorApi(`Room ${req.params.id} n'existe pas`);
      }
    } catch (error) {
      next(error, req, res, next);
    }
  }
  /**
     * @api {put} /rooms/:id Update One Room information
     * @apiName updateOneRoom
     * @apiGroup Room
     *
     * @apiParam {Int} id Room's unique ID.
     * @apiParam {String} [category] string or double room.
     * @apiParam {String} [price] pricce per night.
     * @apiParam {Int} [breakfastNumber] nmber of breakfast per room.
     * @apiParam {String} [option] tv, none...
     * @apiParam {Int} [hostel_id] hostel's unique ID.
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
     * @apiError {json} Room's id Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *         "message": "Room 27897dd n'existe pas",
     *         "code": 404,
     *         "status": "error"
     *       }
     *
     * @apiSuccess {json} data room.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *           {
     *             "message": "room updated",
     *             "status": 200
     *           }
     */
  async updateOneRoom(req, res, next) {
    try {
      const { id } = req.params;
      let currentRoom = await roomsRepository.getOneRoom(id);
      if (currentRoom) {
        console.log("currentroom", currentRoom);
        const newRoom = { ...currentRoom, ...req.body };
        console.log("newRoom", newRoom);
        await roomsRepository.updateOneRoom(id, newRoom);
        res.json({ message: "room updated", status: 200 });
      }
    } catch (error) {
      next(error, req, res, next);
    }
  }
}
