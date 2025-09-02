import { Request, Response } from 'express';
import { Feedback, IFeedback } from '../models/Feedback';

// Create new feedback
export const createFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
      return;
    }

    const feedback = new Feedback({
      name,
      email,
      message
    });

    const savedFeedback = await feedback.save();

    res.status(201).json({
      success: true,
      data: savedFeedback,
      message: 'Feedback created successfully'
    });
  } catch (error) {
    console.error('Error creating feedback:', {
      error: error,
      body: req.body,
      headers: req.headers,
      timestamp: new Date().toISOString()
    });
    
    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          error: process.env['NODE_ENV'] === 'development' ? error.message : undefined
        });
        return;
      }
      
      if (error.name === 'MongoError' || error.name === 'MongoServerError') {
        res.status(500).json({
          success: false,
          message: 'Database connection error',
          error: process.env['NODE_ENV'] === 'development' ? error.message : undefined
        });
        return;
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env['NODE_ENV'] === 'development' ? error : undefined
    });
  }
};

// Get all feedbacks
export const getAllFeedbacks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env['NODE_ENV'] === 'development' ? error : undefined
    });
  }
};

// Get single feedback by ID
export const getFeedbackById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Feedback ID is required'
      });
      return;
    }

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    
    if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: 'Invalid feedback ID format'
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env['NODE_ENV'] === 'development' ? error : undefined
    });
  }
};

// Update feedback by ID
export const updateFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Feedback ID is required'
      });
      return;
    }

    // Validate that at least one field is provided for update
    if (!name && !email && !message) {
      res.status(400).json({
        success: false,
        message: 'At least one field (name, email, or message) must be provided for update'
      });
      return;
    }

    const updateData: Partial<IFeedback> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (message) updateData.message = message;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
      res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedFeedback,
      message: 'Feedback updated successfully'
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    
    if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: 'Invalid feedback ID format'
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env['NODE_ENV'] === 'development' ? error : undefined
    });
  }
};

// Delete feedback by ID
export const deleteFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Feedback ID is required'
      });
      return;
    }

    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
      data: deletedFeedback
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    
    if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: 'Invalid feedback ID format'
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env['NODE_ENV'] === 'development' ? error : undefined
    });
  }
};
