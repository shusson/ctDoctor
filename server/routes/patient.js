import 'babel-polyfill'
import Patient from '../models/patient'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'patient'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

/* eslint-disable no-unused-vars, no-param-reassign, new-cap */

/**
 * @api {get} /api/patient Get all patients
 * @apiName GetPatients
 * @apiGroup Patient
 * @apiSuccessExample {application/json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "_id": "59d8c84406b5eb5738f33f26",
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "address": "Homestead 120",
 *       "dateOfBirth": "1990-10-02T10:40:30.000Z"
 *       "visits": [],
 *       "updatedAt": "2017-10-08T10:42:37.263Z",
 *        "createdAt": "2017-10-08T10:42:37.263Z"
 *     },
 *     {
 *       "_id": "59d8c84406b5eb7844f33f27",
 *       "firstName": "Sara",
 *       "lastName": "McHue",
 *       "address": "Homestead 125",
 *       "dateOfBirth": "1993-01-02T11:23:60.000Z"
 *       "visits": [],
 *       "updatedAt": "2017-10-07T10:42:37.263Z",
 *       "createdAt": "2017-10-07T10:42:37.263Z"
 *     }]
 */
router.get('/', async(ctx) =>
  ctx.body = await Patient.find())

/**
 * @api {post} /api/patient Add a new patient
 * @apiName AddPatient
 * @apiGroup Patient
 * @apiHeaderExample {application/json} Header:
 *     {
 *       "Accept-Encoding": "application/json"
 *     }
 * @apiSuccessExample {application/json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "59d8c84406b5eb5738f33f26",
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "address": "Homestead 120",
 *       "dateOfBirth": "1990-10-02T10:40:30.000Z"
 *       "visits": [],
 *       "updatedAt": "2017-10-08T10:42:37.263Z",
 *        "createdAt": "2017-10-08T10:42:37.263Z"
 *     }
 * @apiErrorExample {application/json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 * @apiParamExample {application/json} Example:
 *     {
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "address": "Homestead 120",
 *       "dateOfBirth": "1990-10-02T10:40:30.000Z",
 *       "visits": []
 *     }
 * @apiParam {String} firstName    Firstname of the Patient.
 * @apiParam {String} lastName     Lastname of the Patient.
 * @apiParam {String} address      Address of the Patient.
 * @apiParam {Date} [dateOfBirth=Date.now()]    Date of birth of the patient
 * @apiParam {Array} [visits]        `Visit` _id's of all patient visits
 */
router.post('/', async(ctx) => {
  try {
    const patient = await new Patient(ctx.request.body).save()
    ctx.body = patient
  } catch (err) {
    console.error('[Patient] Error during POST ', err.message);

    ctx.throw(422)
  }
})

/**
 * @api {get} /api/patient/{id} Get a patient
 * @apiName GetPatient
 * @apiGroup Patient
 * @apiSuccessExample {application/json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "59d8c84406b5eb5738f33f26",
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "address": "Homestead 120",
 *       "dateOfBirth": "1990-10-02T10:40:30.000Z"
 *       "visits": [],
 *       "updatedAt": "2017-10-08T10:42:37.263Z",
 *        "createdAt": "2017-10-08T10:42:37.263Z"
 *     }
 * @apiErrorExample {application/json} Error-Response:
 *     HTTP/1.1 404 Not Found
 * @apiParam {String} id    `Patient` _id.
 */
router.get('/:id', async(ctx) => {
  try {
    const patient = await Patient.findById(ctx.params.id).populate('visits');

    if (!patient) {
      ctx.throw(404)
    }
    ctx.body = patient
  } catch (err) {
    console.error('[Patient] Error during GET ', err.message);

    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

/**
 * @api {put} /api/patient/{id} Update a patient
 * @apiName UpdatePatient
 * @apiGroup Patient
 * @apiHeaderExample {application/json} Header:
 *     {
 *       "Accept-Encoding": "application/json"
 *     }
 * @apiSuccessExample {application/json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "59d8c84406b5eb5738f33f26",
 *       "firstName": "John",
 *       "lastName": "McGreggor",
 *       "address": "Homestead 120",
 *       "dateOfBirth": "1990-10-02T10:40:30.000Z"
 *       "visits": [
 *         {
 *           "_id": "59d8c83206b5eb5228f33f26",
 *           "reasonOfVisit": "Headaches, unable to sleep",
 *           "consult": "Take more sleep, using prescribed pills",
 *           "dateOfVisit": "2017-10-08T10:39:22.263Z",
 *           "prescribedMedication": []
 *           "updatedAt": "2017-10-08T10:42:37.263Z",
 *           "createdAt": "2017-10-08T10:42:37.263Z"
 *         }
 *       ],
 *       "updatedAt": "2017-10-08T11:13:09.133Z",
 *       "createdAt": "2017-10-08T10:42:37.263Z"
 *     }
 * @apiErrorExample {application/json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 * @apiParamExample {application/json} Example:
 *     {
 *       "firstName": "John",
 *       "lastName": "McGreggor",
 *       "visits": [
 *          "59d8c83206b5eb5228f33f26"
 *       ]
 *     }
 * @apiParam {String} firstName    Firstname of the Patient.
 * @apiParam {String} lastName     Lastname of the Patient.
 * @apiParam {String} address      Address of the Patient.
 * @apiParam {Date} [dateOfBirth=Date.now()]    Date of birth of the patient
 * @apiParam {Array} [visits]        `Visit` _id's of all patient visits
 */
router.put('/:id', async(ctx) => {
  try {
    const patient = await Patient.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!patient) {
      ctx.throw(404)
    }
    ctx.body = patient
  } catch (err) {
    console.error('[Patient] Error during PUT ', err.message);

    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

/**
 * @api {delete} /api/patient/{id} Delete a patient
 * @apiName DeletePatient
 * @apiGroup Patient
 * @apiParam {String} id    `Patient` _id.
 */
router.delete('/:id', async(ctx) => {
  try {
    const patient = await Patient.findByIdAndRemove(ctx.params.id)
    if (!patient) {
      ctx.throw(404)
    }
    ctx.body = patient
  } catch (err) {
    console.error('[Patient] Error during DELETE ', err.message);

    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

/* eslint-enable no-unused-vars, no-param-reassign, new-cap */

export default router
