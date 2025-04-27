import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'; 
function Failure() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // Redirect to home page after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="failure-container">
      <div className="failure-content">
        <div className="failure-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="failure-title">Payment Failed!</h1>
        <p className="failure-message">Your transaction could not be completed.</p>
        <p className="failure-submessage">Please try again or use a different payment method.</p>
        <button 
          onClick={() => navigate('/home')}
          className="failure-button"
        >
          Back to Dashboard
        </button>
        <p className="redirect-message">You will be redirected automatically in 5 seconds...</p>
      </div>
    </div>
  );
}


const styles = `
  .failure-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f7fafc;
    padding: 2rem;
  }

  .failure-content {
    text-align: center;
    background: white;
    padding: 2rem 3rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-width: 500px;
    width: 100%;
  }

  .failure-icon {
    margin-bottom: 1.5rem;
    animation: shake 0.5s;
  }

  .failure-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ef4444;
    margin-bottom: 1rem;
  }

  .failure-message {
    color: #4b5563;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .failure-submessage {
    color: #6b7280;
    margin-bottom: 2rem;
  }

  .failure-button {
    background-color: #ef4444;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.3s;
    border: none;
    cursor: pointer;
  }

  .failure-button:hover {
    background-color: #dc2626;
  }

  .redirect-message {
    color: #6b7280;
    font-size: 0.875rem;
    margin-top: 1.5rem;
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-5px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(5px);
    }
  }
`;


const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Failure;