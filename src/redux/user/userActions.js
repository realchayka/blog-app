import BlogService from '../../services/blog-service'

export const fetchRegisterRequest = () => ({
  type: 'REGISTER_REQUEST',
})

export const fetchRegisterSuccess = (user) => ({
  type: 'REGISTER_SUCCESS',
  payload: user,
})

export const fetchRegisterFailure = (error) => ({
  type: 'REGISTER_FAILURE',
  payload: error,
})
export const fetchLoginRequest = () => ({
  type: 'LOGIN_REQUEST',
})

export const fetchLoginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
})

export const fetchLoginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
})

export const logoutHandler = () => ({
  type: 'LOGOUT',
})

export const handleClearError = () => ({
  type: 'CLEAR_ERROR',
})
export const fetchUpdateRequest = () => ({
  type: 'UPDATE_REQUEST',
})

export const fetchUpdateSuccess = (user) => ({
  type: 'UPDATE_SUCCESS',
  payload: user,
})

export const fetchUpdateFailure = (error) => ({
  type: 'UPDATE_FAILURE',
  payload: error,
})

const service = new BlogService()

export const fetchRegister = (username, email, password) => {
  return async (dispatch) => {
    dispatch(fetchRegisterRequest())
    try {
      const response = await service.registerUser(username, email, password)
      dispatch(fetchRegisterSuccess(response))
    } catch (error) {
      dispatch(fetchRegisterFailure(error))
    }
  }
}

export const fetchLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(fetchLoginRequest())
    try {
      const response = await service.loginUser(email, password)
      dispatch(fetchLoginSuccess(response))
    } catch (error) {
      dispatch(fetchLoginFailure(error))
    }
  }
}

export const autoLogin = () => {
  return async (dispatch) => {
    try {
      const response = await service.autoLogin()
      console.log(response)
      dispatch(fetchLoginSuccess(response))
    } catch (error) {
      console.log('error')
    }
  }
}

export const fetchUpdateUser = (email, username, password, imageUrl) => {
  return async (dispatch) => {
    dispatch(fetchUpdateRequest())
    try {
      const response = await service.updateUser(email, username, password, imageUrl)
      dispatch(fetchUpdateSuccess(response.data))
    } catch (error) {
      dispatch(fetchUpdateFailure(error))
    }
  }
}
