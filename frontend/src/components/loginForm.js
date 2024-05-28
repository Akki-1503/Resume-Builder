import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginUser } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Alert } from 'react-bootstrap'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.user.error)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(startLoginUser(formData, navigate))
  }

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  )
}

export default Login
