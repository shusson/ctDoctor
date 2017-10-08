import mongoose from 'mongoose'

const Schema = mongoose.Schema

const patientSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, default: Date.now },
  visits: [
    { type: Schema.Types.ObjectId, ref: 'Visit' }
  ]
}, {
  timestamps: true
});

export default mongoose.model('Patient', patientSchema)
