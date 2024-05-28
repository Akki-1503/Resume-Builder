import { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ForgotPassword() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.email || !formData.newPassword || !formData.confirmNewPassword) {
        setError('All fields are required.')
        return
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        setError('New password and confirm new password do not match.')
        return
      }
          
      const response = await axios.post('http://localhost:3321/api/users/reset-password', formData)
      setSuccessMessage(response.data.message)
      
      navigate('/login')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewPassword">
              <Form.Label>New Password</Form.Label> <br />
              <Form.Control
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              /> <br />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label> <br />
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              /> <br />
            </Form.Group>

            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPassword
