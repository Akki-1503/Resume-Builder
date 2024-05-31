import axios from 'axios'

export const startRegisterUser = (userData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3321/api/users/register', userData)
      dispatch(userRegistered(response.data))
      console.log('userdata', userData)
      navigate('/login')
      window.alert('Successfully Registered. Please login.')
    } catch (err) {
      console.error(err)
      if (err.response && (err.response.status === 400 || err.response.status === 401)) {
        dispatch({ type: 'REGISTER_ERROR', payload: err.response.data.message })
      } else {
        dispatch({ type: 'REGISTER_ERROR', payload: 'An unexpected error occurred. Please try again later.' })
      } 
    }
  }
}

const userRegistered = (userData) => {
  return { type: 'USER_REGISTERED', payload: userData }
}

export const startLoginUser = (userData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3321/api/users/login', userData)
      const { token } = response.data
      localStorage.setItem('token', token)

      const userResponse = await axios.get('http://localhost:3321/api/users/account', {
        headers: {
          Authorization: token,
        },
      })
      dispatch(userLoggedIn(userResponse.data))
      navigate('/account')
    } catch (error) {
      console.error(error)
      if (error.response) {
        if (error.response.status === 403) {
          dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.message })
        } else if (error.response.status === 404) {
          dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.error })
        } else {
          dispatch({ type: 'LOGIN_ERROR', payload: 'An unexpected error occurred. Please try again later.' })
        }
      } else if (error.request) {
        dispatch({ type: 'LOGIN_ERROR', payload: 'Network Error. Please check your connection and try again.' })
      } else {
        dispatch({ type: 'LOGIN_ERROR', payload: 'An unexpected error occurred. Please try again later.' })
      }
    }
  }
}

const userLoggedIn = (userData) => {
  return { type: 'USER_LOGGED_IN', payload: userData }
}

export const startGetUserAccount = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3321/api/users/account', {
        headers: {
          Authorization: token,
        },
      })
      dispatch(userAccount(response.data))
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }
}

const userAccount = (userData) => {
  return { type: 'USER_ACCOUNT', payload: userData }
}

export const startUpdateProfile = (updateData, userId, navigate) => {
  return async (dispatch) => {
    try{
      console.log('userid', userId)
      const response = await axios.put(`http://localhost:3321/api/users/${userId}`, updateData,
      {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      }
      )
      const profileData = response.data
        console.log('profile', profileData)
        dispatch(updateProfile(profileData))
        window.alert('Profile updated successfully')
        navigate('/account')
    } catch(err) {
      console.error(err)
    }
  }
}

const updateProfile = (data) => {
  return { type: 'UPDATE_PROFILE', payload: data }
}

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT_USER' })
  }
}
