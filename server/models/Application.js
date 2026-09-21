import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      default: 'Applied',
    },

    appliedDate: {
      type: String,
      default: '',
    },

    jobUrl: {
      type: String,
      default: '',
    },

    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Application', applicationSchema)