export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo */}
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
          <span className="text-xl">📄</span>
        </div>
        
        {/* Spinner */}
        <div className="relative">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200"></div>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent absolute top-0"></div>
        </div>
        
        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">Loading</p>
          <p className="text-xs text-gray-500 mt-1">Please wait...</p>
        </div>
      </div>
    </div>
  );
}
