import 'babel-polyfill'
import Visit from '../models/visit'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'visit'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

/* eslint-disable no-unused-vars, no-param-reassign, new-cap */

/**
 * @api {get} /api/visit Get all visits
 * @apiName GetVisits
 * @apiGroup Visit
 * @apiSuccessExample {application/json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "_id": "59d8c83206b5eb5228f98f27",
 *       "reasonOfVisit": "Pain in chest, difficult to breathe.",
 *       "consult": "Sent to hospital for more detailed checkup",
 *       "dateOfVisit": "2017-10-02T10:39:22.263Z",
 *       "patient": "59d8c84406b5eb5738f33f26",
 *       "prescribedMedication": [],
 *       "updatedAt": "2017-10-08T09:24:21.263Z",
 *       "updatedAt": "2017-10-08T09:24:21.263Z",
 *     },
 *     {
 *       "_id": "59d8c83206b5eb5228f33f26",
 *       "reasonOfVisit": "Headaches, unable to sleep",
 *       "consult": "Take more sleep, using prescribed pills",
 *       "dateOfVisit": "2017-10-08T10:39:22.263Z",
 *       "patient": "59d8c84406b5eb7844f33f27",
 *       "prescribedMedication": [],
 *       "updatedAt": "2017-10-08T10:42:37.263Z",
 *       "createdAt": "2017-10-08T10:42:37.263Z"
 *     }]
 */
router.get('/', async(ctx) =>
  ctx.body = await Visit.find())

/**
 * @api {post} /api/visit Add a new visit
 * @apiName AddVisit
 * @apiGroup Visit
 * @apiHeaderExample {application/json} Header:
 *     {
 *       "Accept-Encoding": "application/json"
 *     }
 * @apiSuccessExample {application/json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "59d8c83206b5eb5228f33f26",
 *       "reasonOfVisit": "Headaches, unable to sleep",
 *       "consult": "Take more sleep, using prescribed pills",
 *       "dateOfVisit": "2017-10-08T10:39:22.263Z",
 *       "patient": "59d8c84406b5eb7844f33f27",
 *       "prescribedMedication": [],
 *       "updatedAt": "2017-10-08T10:42:37.263Z",
 *       "createdAt": "2017-10-08T10:42:37.263Z"
 *     }
 * @apiErrorExample {application/json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 * @apiParamExample {application/json} Example:
 *     {
 *       "reasonOfVisit": "Headaches, unable to sleep",
 *       "consult": "Take more sleep, using prescribed pills",
 *       "patient": "59d8c84406b5eb7844f33f27",
 *       "dateOfVisit": "2017-10-08T10:39:22.263Z",
 *       "prescribedMedication": []
 *     }
 * @apiParam {String} reasonOfVisit Reason of the Visit.
 * @apiParam {String} consult       Given consult.
 * @apiParam {String} patient    ID of `Patient` that visited. This field will always be returned as an ID.
 * @apiParam {Date} [dateOfVisit=Date.now()]    Date of the visit.
 * @apiParam {Array} [prescribedMedication]   `Medication` _id's of all prescribed medicines.
 */
router.post('/', async(ctx) => {
  try {
    const visit = await new Visit(ctx.request.body).save()
    ctx.body = visit
  } catch (err) {
    console.error('[Visit] Error during POST ', err.message);
    ctx.throw(422)
  }
})

/**
 * @api {get} /api/visit/{id} Get a visit
 * @apiName GetVisit
 * @apiGroup Visit
 * @apiSuccessExample {application/json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "59d8c83206b5eb5228f33f26",
 *       "reasonOfVisit": "Headaches, unable to sleep",
 *       "consult": "Take more sleep, using prescribed pills",
 *       "dateOfVisit": "2017-10-08T10:39:22.263Z",
 *       "patient": "59d8c84406b5eb7844f33f27",
 *       "prescribedMedication": [],
 *       "updatedAt": "2017-10-08T10:42:37.263Z",
 *       "createdAt": "2017-10-08T10:42:37.263Z"
 *     }
 * @apiErrorExample {application/json} Error-Response:
 *     HTTP/1.1 404 Not Found
 * @apiParam {String} id    `Visit` _id.
 */
router.get('/:id', async(ctx) => {
  try {
    const visit = await Visit.findById(ctx.params.id).populate('prescribedMedication');
    if (!visit) {
      ctx.throw(404)
    }
    ctx.body = visit
  } catch (err) {
    console.error('[Visit] Error during GET ', err.message);

    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

/**
 * @api {put} /api/visit/{id} Update a visit
 * @apiName UpdateVisit
 * @apiGroup Visit
 * @apiHeaderExample {application/json} Header:
 *     {
 *       "Accept-Encoding": "application/json"
 *     }
 * @apiSuccessExample {application/json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "59d8c83206b5eb5228f33f26",
 *       "reasonOfVisit": "Headaches, unable to sleep properly for two weeks now.",
 *       "consult": "Take more sleep, using prescribed pills. Come back in one week.",
 *       "dateOfVisit": "2017-10-08T10:39:22.263Z",
 *       "patient": "59d8c84406b5eb7844f33f27",
 *       "prescribedMedication": [{
 *           "updatedAt": "2017-10-08T11:40:29.178Z",
 *           "createdAt": "2017-10-08T11:40:29.178Z",
 *           "name": "Ibuprofen",
 *           "dose": "120mg",
 *           "packageSize": "10 tablets",
 *           "_id": "59da0ead38cb8764a192345b"
 *       }],
 *       "updatedAt": "2017-10-08T10:42:37.263Z",
 *       "createdAt": "2017-10-08T10:42:37.263Z"
 *     }
 * @apiErrorExample {application/json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 * @apiParamExample {application/json} Example:
 *     {
 *       "reasonOfVisit": "Headaches, unable to sleep properly for two weeks now.",
 *       "consult": "Take more sleep, using prescribed pills. Come back in one week.",
 *       "prescribedMedication": [
 *          "59da0ead38cb8764a192345b"
 *       ]
 *     }
 * @apiParam {String} reasonOfVisit Reason of the Visit.
 * @apiParam {String} consult       Given consult.
 * @apiParam {String} patient    ID of `Patient` that visited. This field will always be returned as an ID. 
 * @apiParam {Date} [dateOfVisit=Date.now()]    Date of the visit.
 * @apiParam {Array} [prescribedMedication]        `Medication` _id's of all prescribed medicines.
 */
router.put('/:id', async(ctx) => {
  try {
    const visit = await Visit.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!visit) {
      ctx.throw(404)
    }
    ctx.body = visit
  } catch (err) {
    console.error('[Visit] Error during PUT ', err.message);

    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

/**
 * @api {delete} /api/visit/{id} Delete a visit
 * @apiName DeleteVisit
 * @apiGroup Visit
 * @apiParam {String} id    `Visit` _id.
 */
router.delete('/:id', async(ctx) => {
  try {
    const visit = await Visit.findByIdAndRemove(ctx.params.id)
    if (!visit) {
      ctx.throw(404)
    }
    ctx.body = visit
  } catch (err) {
    console.error('[Visit] Error during DELETE ', err.message);

    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

/* eslint-enable no-unused-vars, no-param-reassign, new-cap */

export default router
