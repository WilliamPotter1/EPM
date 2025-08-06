import { useState } from 'react'
import { Link } from 'react-router-dom'
import epmLogo from '../assets/images/superservicios-gris-negro.svg'
import './SignUp.css'

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success') // 'success' or 'error'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Check if passwords match
  const passwordsMatch = formData.password === formData.confirmPassword
  const showPasswordError = formData.confirmPassword.length > 0 && !passwordsMatch

  // Check if all fields are filled and passwords match
  const isFormValid = formData.username.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     formData.password.trim() !== '' && 
                     formData.confirmPassword.trim() !== '' && 
                     passwordsMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://38.225.209.32:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Registration successful:', data)
        setAlertMessage('Registration successful!')
        setAlertType('success')
        setShowAlert(true)
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      } else {
        const errorData = await response.json()
        console.error('Registration failed:', errorData)
        setAlertMessage(`Registration failed: ${errorData.message || 'Unknown error'}`)
        setAlertType('error')
        setShowAlert(true)
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setAlertMessage('Registration failed: Network error')
      setAlertType('error')
      setShowAlert(true)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <Link to="/" className="back-link">
            ← Back to home
          </Link>
          <img src={epmLogo} alt="EPM Logo" className="signup-logo" />
          <h1 className="signup-title">User Registration</h1>
          <p className="signup-subtitle">Create your account to access EPM Web Invoice</p>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirm your password"
              className={showPasswordError ? 'password-error' : ''}
            />
            {showPasswordError && (
              <span className="error-message">Passwords do not match</span>
            )}
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className={`signup-btn ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid}
            >
              Register
            </button>
            <Link to="/" className="cancel-link">
              Cancel
            </Link>
          </div>
        </form>
        
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
        </div>
      </div>

      {/* Beautiful Alert Modal */}
      {showAlert && (
        <div className="alert-overlay" onClick={() => setShowAlert(false)}>
          <div className={`alert-modal ${alertType}`} onClick={(e) => e.stopPropagation()}>
            <div className="alert-icon">
              {alertType === 'success' ? '✅' : '❌'}
            </div>
            <h3 className="alert-title">
              {alertType === 'success' ? 'Success!' : 'Error!'}
            </h3>
            <p className="alert-message">{alertMessage}</p>
            <button 
              className="alert-button"
              onClick={() => setShowAlert(false)}
            >
              {alertType === 'success' ? 'Continue' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp 