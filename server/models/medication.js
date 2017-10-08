import mongoose from 'mongoose'

const Schema = mongoose.Schema

const medicationSchema = new Schema({
  name: { type: String, required: true, trim: true },
  dose: { type: String, required: true },
  packageSize: { type: String, required: true, trim: true }
}, {
  timestamps: true
});

export default mongoose.model('Medication', medicationSchema);
