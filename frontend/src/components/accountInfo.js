import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetUserAccount, logoutUser } from '../actions/userAction'
import { Container, Card, Button, Spinner } from 'react-bootstrap'

const Account = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(startGetUserAccount())
  }, [dispatch])

  return (
    <Container className="mt-5">
      <h2>Account Info</h2>
      {user ? (
        <Card>
          <Card.Body>
            <Card.Title>Username: {user.username}</Card.Title>
            <Card.Text>Email: {user.email}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </Container>
  )
}

export default Account
