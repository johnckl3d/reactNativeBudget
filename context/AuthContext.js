import React, { useContext, useState, useEffect } from "react"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [data, setData] = React.useState({
        username: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
      });
      
  const [loading, setLoading] = useState(false)

  function signup(email, password) {
   
  }

  function login(email, password) {
   
  }

  function logout() {
   
  }

  function resetPassword(email) {
   
  }

  function updateEmail(email) {
   
  }

  function updatePassword(password) {
    
  }


  const value = {
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
