import CustomerRepo from "./customersRepository.js";
const customerRepository = new CustomerRepo();
import data from "../../service/service.dataReponse.js";

export default class Customer {
    /**
       * @api {get} /customers/:id Get One Customer Informations
       * @apiName getOneCustomer
       * @apiGroup Customer
       *
       * @apiParam {Int} id Customer's unique ID.
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
       * @apiError {json} Customer Not Found
       * @apiErrorExample {json} Error-Response:
       *     HTTP/1.1 404 Not Found
       *     {
       *       "error": "Customer Not Found."
       *     }
       *
       * @apiSuccess {json} data customer.
       * @apiSuccessExample {json} Success-Response:
       *     HTTP/1.1 200 OK
            {
                "records": {
                    "id": 6,
                    "firstname": "Chloé",
                    "lastname": "Sleightholme",
                    "email": "bsleightholme5@cloudflare.com"
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
    async getOneCustomerById(req, res, next) {
        const {id} = req.params;
        try {
            const record = await customerRepository.getOneCustomerById(id);
            res.send(data(record)); 
        } catch (error) {
            next(error, req, res, next);
        }
    }

    /**
       * @api {get} /customers/?mail=&page=&limit= Get All Customer Informations
       * @apiName getAllCustomer
       * @apiGroup Customer
       *
       * @apiParam {String} mail Customer's mail.
       * @apiParam {Int} [page=1] the page's number we search. .
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
       * @apiError {json} Customer Not Found
       * @apiErrorExample {json} Error-Response:
       *     HTTP/1.1 404 Not Found
       *     {
       *       "error": "Customer Not Found."
       *     }
       *
       * @apiSuccess {json} data customer.
       * @apiSuccessExample {json} Success-Response:
       *     HTTP/1.1 200 OK
            {
                "records": [
                    {
                        "id": 1,
                        "firstname": "Mylène",
                        "lastname": "Juara",
                        "email": "mjuara0@yelp.com"
                    },
                    {
                        "id": 2,
                        "firstname": "Solène",
                        "lastname": "MacMechan",
                        "email": "nmacmechan1@mac.com"
                    }
                ],
                "nbRecords": 100,
                "page": {
                    "current": "1",
                    "previous": null,
                    "next": "11",
                    "last": 50
                }
            }
       */
    async getAllCustomer(req, res, next){
        const email = req.query.email || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        try {
            const result = await customerRepository.getAllCustomer(email, page, limit);
            res.send(data(result.records, page, result.count, limit));
        } catch (error) {
            next(error, req, res, next);
        }
    }

}