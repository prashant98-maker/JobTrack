import express from 'express'
import Application from '../models/Application.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1,
    })

    res.json(applications)
  } catch {
    res.status(500).json({
      message: 'Failed to fetch applications',
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const application = await Application.create(req.body)

    res.status(201).json(application)
  } catch {
    res.status(400).json({
      message: 'Failed to create application',
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
      })
    }

    res.json(application)
  } catch {
    res.status(400).json({
      message: 'Failed to update application',
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(
      req.params.id,
    )

    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
      })
    }

    res.json({
      message: 'Application deleted successfully',
    })
  } catch {
    res.status(400).json({
      message: 'Failed to delete application',
    })
  }
})

export default router