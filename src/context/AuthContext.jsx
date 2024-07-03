import { createContext, useContext, useReducer } from 'react'

export const AuthContext = createContext()
export const AuthDispatchContext = createContext()

export function AuthProvider ({ children }) {
  const [auth, dispatch] = useReducer(authReducer, initialAuth)

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}

export function useAuthDispatch () {
  return useContext(AuthDispatchContext)
}

function authReducer (auth, action) {
  switch (action.type) {
    case TYPE_AUTH.LOGIN: {
      return {
        auth: true,
        name: action.payload.name
      }
    }
    case TYPE_AUTH.LOGOUT: {
      return initialAuth
    }
  }
}

const initialAuth = {
  auth: false,
  name: ''
}

export const TYPE_AUTH = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}
