import { useState } from 'react';

export default function Navbar({ user, onSignOut }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo dan Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                📄 Sistem Manajemen Surat
              </h1>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-2 hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.departemen || 'No Department'} • {user?.role || 'user'}
                </div>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.name || 'User'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user?.email}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {user?.departemen || 'No Department'} • {user?.role || 'user'}
                  </div>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      // Bisa ditambahkan navigasi ke profile page
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    👤 Profile
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      // Bisa ditambahkan navigasi ke settings page
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    ⚙️ Pengaturan
                  </button>
                  
                  <hr className="my-1" />
                  
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onSignOut();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    🚪 Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile User Info */}
      <div className="md:hidden px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="text-sm font-medium text-gray-900">
          {user?.name || 'User'}
        </div>
        <div className="text-xs text-gray-500">
          {user?.email} • {user?.departemen || 'No Department'}
        </div>
      </div>
    </nav>
  );
}