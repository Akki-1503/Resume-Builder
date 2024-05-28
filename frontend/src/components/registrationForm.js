import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startRegisterUser } from '../actions/userAction'
import { Form, Button, Alert, Container } from 'react-bootstrap'

function RegistrationForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const error = useSelector((state) => state.user.error)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  })

  const [validationError, setValidationError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(startRegisterUser(formData, navigate))
    }
  }

  const validateForm = () => {
    const { username, email, password, role } = formData
    let valid = true
    let error = ''

    if (!username || !email || !password) {
      valid = false
    } else if (password.length < 8) {
      error = 'Password must be at least 8 characters long.'
      valid = false
    } else if (!/[A-Z]/.test(password)) {
      error = 'Password must contain at least one capital letter.'
      valid = false
    } else if (!/[!@#$%^&*_-]/.test(password)) {
      error = 'Password must contain at least one special character (!@#$%^&*_-).'
      valid = false
    }

    setValidationError(error)
    return valid
  }

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {validationError && <Alert variant="danger">{validationError}</Alert>}
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>

        <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
      </Form>
    </Container>
  )
}

export default RegistrationForm
