'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMode, setLoginMode] = useState('email'); // 'email' or 'credentials'

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      await signIn('email', { email });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSignIn = async () => {
    if (!email || !password) return;
    setIsLoading(false);
    // try {
      const result = await signIn('admin-credentials', {
        email,
        password,
        redirect: true,
      });
      console.log('Sign in result:', result);
    //   if (result?.error) {
    //     alert('Invalid credentials');
    //   }
    // } catch (error) {
    //   console.error('Sign in error:', error);
    // } finally {
      setIsLoading(false);
    // }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div>
        
        <div className="min-h-screen flex">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-20 lg:py-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">📄</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Sistem Manajemen Surat
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                Kelola surat organisasi dengan mudah dan otomatis. 
                Sistem penomoran otomatis dengan manajemen yang terintegrasi.
              </p>
            </div>
            
            <div className="space-y-4 text-blue-100">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-sm">Penomoran surat otomatis</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-sm">Template surat terintegrasi</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-sm">Manajemen terintegrasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Authentication */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?{' '}
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                  Contact administrator
                </a>
              </p>
              
              {/* Admin Credentials Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Testing Credentials
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>For admin testing, use:</p>
                      <p><strong>Email:</strong> admin@mail.com</p>
                      <p><strong>Password:</strong> admin123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              {/* Login Mode Toggle */}
              <div className="mb-6">
                <div className="flex rounded-md bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setLoginMode('email')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      loginMode === 'email'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Email Magic Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMode('credentials')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      loginMode === 'credentials'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Admin Login
                  </button>
                </div>
              </div>

              <div>
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  loginMode === 'email' ? handleEmailSignIn() : handleCredentialsSignIn();
                }} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                        placeholder={loginMode === 'credentials' ? 'admin@mail.com' : 'Enter your email'}
                      />
                    </div>
                  </div>

                  {loginMode === 'credentials' && (
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                          placeholder="admin123"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading || !email || (loginMode === 'credentials' && !password)}
                      className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {loginMode === 'email' ? 'Sending magic link...' : 'Signing in...'}
                        </div>
                      ) : (
                        loginMode === 'email' ? 'Sign in with Email' : 'Sign in as Admin'
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                      <span className="bg-white px-6 text-gray-900">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="text-sm font-semibold leading-6">Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return null;
}
