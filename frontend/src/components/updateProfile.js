import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startGetUserAccount, startUpdateProfile } from '../actions/userAction'
import { Form, Button } from 'react-bootstrap'

function UpdateProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user.user) // Updated to fetch user from state.user.user

  const [formData, setFormData] = useState({
    email: '',
    contact: '',
    username: '',
  })

  useEffect(() => {
    // Fetch user account data on component mount
    dispatch(startGetUserAccount())
  }, [dispatch])

  useEffect(() => {
    // Update formData state when user data is fetched
    if (user && user._id) {
      setFormData({
        email: user.email || '',
        contact: user.contact || '',
        username: user.username || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedData = {
      ...formData
    }
    console.log(formData, 'formdata') 
    console.log( 'updatedData', updatedData)

    if (user && user._id) {
      dispatch(startUpdateProfile(updatedData, user._id, navigate))
    }
  } 

  return (
    <div>
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit}>
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

        <Form.Group controlId="formContact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
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

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  )
}

export default UpdateProfile
