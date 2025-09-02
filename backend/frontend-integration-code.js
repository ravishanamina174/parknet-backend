// ========================================
// PARKNET FRONTEND INTEGRATION CODE
// ========================================
// Copy this code into your Cursor AI frontend project

// API Configuration
// Update this URL based on your deployment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-deployment-url.vercel.app'  // Replace with your actual backend URL
  : 'http://localhost:3001';

// ========================================
// 1. API SERVICE FUNCTIONS
// ========================================

// Health Check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Get all feedbacks
export const getAllFeedbacks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedbacks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch feedbacks:', error);
    throw error;
  }
};

// Get single feedback by ID
export const getFeedbackById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedbacks/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    throw error;
  }
};

// Create new feedback
export const createFeedback = async (feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedbacks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to create feedback:', error);
    throw error;
  }
};

// Update feedback
export const updateFeedback = async (id, feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedbacks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to update feedback:', error);
    throw error;
  }
};

// Delete feedback
export const deleteFeedback = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedbacks/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to delete feedback:', error);
    throw error;
  }
};

// ========================================
// 2. REACT COMPONENT EXAMPLES
// ========================================

// Feedback Form Component
export const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await createFeedback(formData);
      if (result.success) {
        setMessage('Feedback submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setMessage('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      setMessage('Error submitting feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>Submit Feedback</h2>
      
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={1000}
          rows={5}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </form>
  );
};

// Feedback List Component
export const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const result = await getAllFeedbacks();
        if (result.success) {
          setFeedbacks(result.data);
        } else {
          setError('Failed to load feedbacks');
        }
      } catch (err) {
        setError('Error loading feedbacks');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <div>Loading feedbacks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feedback-list">
      <h2>Customer Feedback ({feedbacks.length})</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback._id} className="feedback-item">
          <div className="feedback-header">
            <h3>{feedback.name}</h3>
            <span className="email">{feedback.email}</span>
            <span className="date">
              {new Date(feedback.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="feedback-message">{feedback.message}</p>
        </div>
      ))}
    </div>
  );
};

// ========================================
// 3. CSS STYLES
// ========================================

export const feedbackStyles = `
.feedback-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.feedback-form h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.feedback-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.feedback-list h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.feedback-item {
  background: white;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-left: 4px solid #007bff;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.feedback-header h3 {
  margin: 0;
  color: #333;
}

.email {
  color: #666;
  font-size: 14px;
}

.date {
  color: #999;
  font-size: 12px;
}

.feedback-message {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .feedback-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .feedback-header h3 {
    margin-bottom: 5px;
  }
}
`;

// ========================================
// 4. USAGE EXAMPLES
// ========================================

// Example 1: Basic usage in a React component
export const ExampleUsage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const result = await getAllFeedbacks();
        if (result.success) {
          setFeedbacks(result.data);
        }
      } catch (error) {
        console.error('Error loading feedbacks:', error);
      }
    };

    loadFeedbacks();
  }, []);

  const handleSubmitFeedback = async (feedbackData) => {
    try {
      const result = await createFeedback(feedbackData);
      if (result.success) {
        // Refresh the feedback list
        const updatedResult = await getAllFeedbacks();
        if (updatedResult.success) {
          setFeedbacks(updatedResult.data);
        }
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <FeedbackForm onSubmit={handleSubmitFeedback} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
};

// Example 2: Testing API connection
export const testAPIConnection = async () => {
  console.log('🧪 Testing ParkNet API Connection...');
  
  try {
    // Test health endpoint
    const health = await checkHealth();
    console.log('✅ Health check:', health);
    
    // Test get feedbacks
    const feedbacks = await getAllFeedbacks();
    console.log('✅ Feedbacks loaded:', feedbacks.count, 'items');
    
    // Test create feedback
    const newFeedback = await createFeedback({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test feedback from the frontend!'
    });
    console.log('✅ Feedback created:', newFeedback);
    
    return true;
  } catch (error) {
    console.error('❌ API test failed:', error);
    return false;
  }
};

// ========================================
// 5. ENVIRONMENT CONFIGURATION
// ========================================

// For different environments, update the API_BASE_URL:
// Development: http://localhost:3001
// Production: https://your-production-domain.com
// Staging: https://your-staging-domain.com

export const API_CONFIG = {
  development: 'http://localhost:3001',
  production: 'https://your-production-domain.com',
  staging: 'https://your-staging-domain.com'
};

// Auto-detect environment
export const getAPIBaseURL = () => {
  const env = process.env.NODE_ENV || 'development';
  return API_CONFIG[env] || API_CONFIG.development;
};

// ========================================
// END OF FRONTEND INTEGRATION CODE
// ========================================
