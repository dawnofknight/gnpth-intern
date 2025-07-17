export default function RecentDocuments({ surat, onEdit, onView }) {
  const getStatusBadge = (status) => {
    const styles = {
      'draft': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'pending': 'bg-blue-100 text-blue-800'
    };
    
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      'draft': 'Draft',
      'approved': 'Disetujui',
      'rejected': 'Ditolak',
      'pending': 'Pending'
    };
    
    return texts[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {surat.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-gray-500">Belum ada surat yang dibuat</p>
          </div>
        ) : (
          surat.slice(0, 5).map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {item.kategori?.charAt(0)?.toUpperCase() || 'S'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.judul}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {item.nomorSurat} • {item.departemen}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onView(item)}
                      className="p-1 text-gray-400 hover:text-blue-600 rounded"
                      title="View"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1 text-gray-400 hover:text-blue-600 rounded"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
