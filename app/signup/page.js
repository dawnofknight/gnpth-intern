'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  
  const validateForm = () => {
    // Reset error
    setError('')

    // Check empty fields
    if (!formData.username.trim()) {
      setError('Username is required')
      return false
    }

    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }

    if (!formData.password) {
      setError('Password is required')
      return false
    }

    if (!formData.confirmPassword) {
      setError('Please confirm your password')
      return false
    }

    // Username validation
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long')
      return false
    }

    if (formData.username.length > 50) {
      setError('Username must be less than 50 characters')
      return false
    }

    // Email validation (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    // Password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }

    // Password strength check (optional)
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number')
      return false
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validasi form
    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      })
      
     console.log('Response status:', response.status)

      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      console.log('Signup successful:', data)
      setSuccess(true)
      
      // Redirect ke login page setelah 2 detik
      setTimeout(() => {
        router.push('/signin')
      }, 2000)
      
    } catch (error) {
      console.log('Error caught:', error)
      console.log('Error name:', error?.name)
      console.log('Error message:', error?.message)
      
      // Handle Zod validation errors
      if (error?.name === 'ZodError') {
        console.log('Zod validation errors:', error.errors)
        const firstError = error.errors?.[0]
        const errorMessage = firstError?.message || 'Validation failed'
        setError(errorMessage)
      } else {
        // Handle other errors (network, server, etc.)
        const errorMessage = error?.message || error?.toString() || 'An error occurred'
        console.error('Signup error:', errorMessage)
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }


  // Jika signup berhasil, tampilkan success message
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#496A71]">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600">Redirecting to login page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#496A71] py-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2F4858] mb-2">Create Account</h1>
            <p className="text-gray-600">Join our digital letter archiving system</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A7D74] focus:border-transparent"
                placeholder="Choose a username"
                minLength={3}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A7D74] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A7D74] focus:border-transparent"
                placeholder="Create a password"
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A7D74] focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5A7D74] hover:bg-[#4b6e65] text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-[#5A7D74] hover:text-[#4b6e65] font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/landing"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Landing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

