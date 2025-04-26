import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // Redirect to home page after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">Your transaction has been completed successfully.</p>
        <button 
          onClick={() => navigate('/home')}
          className="success-button"
        >
          Back to Dashboard
        </button>
        <p className="redirect-message">You will be redirected automatically in 5 seconds...</p>
      </div>
    </div>
  );
}


const styles = `
  .success-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f7fafc;
    padding: 2rem;
  }

  .success-content {
    text-align: center;
    background: white;
    padding: 2rem 3rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-width: 500px;
    width: 100%;
  }

  .success-icon {
    margin-bottom: 1.5rem;
    animation: bounce 1s;
  }

  .success-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #10b981;
    margin-bottom: 1rem;
  }

  .success-message {
    color: #4b5563;
    margin-bottom: 2rem;
  }

  .success-button {
    background-color: #10b981;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.3s;
    border: none;
    cursor: pointer;
  }

  .success-button:hover {
    background-color: #059669;
  }

  .redirect-message {
    color: #6b7280;
    font-size: 0.875rem;
    margin-top: 1.5rem;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

// Add styles to the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Success;