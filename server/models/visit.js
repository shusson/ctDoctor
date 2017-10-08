import mongoose from 'mongoose'

const Schema = mongoose.Schema

const visitSchema = new Schema({
  reasonOfVisit: { type: String, required: true },
  consult: { type: String, required: true },
  dateOfVisit: { type: Date, default: Date.now },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  prescribedMedication: [
    { type: Schema.Types.ObjectId, ref: 'Medication' }
  ]
}, {
  timestamps: true
});

export default mongoose.model('Visit', visitSchema);
