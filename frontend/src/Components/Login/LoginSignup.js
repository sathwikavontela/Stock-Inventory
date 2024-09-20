import React, { useState } from 'react'
import LoginImage from '../utils/LogImg.png'
import Header from '../Home/Header'

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(isLogin ? 'Logging in' : 'Signing up', { username, password })
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-white">
        <div className="w-1/2 flex items-center justify-center">
          <img src={LoginImage} alt="Login" className="w-3/4 h-auto" />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-lg">
            <h2 className="text-2xl font-bold text-center text-[#b14ae8] mb-6">
              {isLogin ? 'Login' : 'Sign Up'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14ae8]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#b14ae8] hover:bg-[#9a3ed0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#b14ae8] hover:underline focus:outline-none"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Log In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginSignup
