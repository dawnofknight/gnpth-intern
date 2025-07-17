export default function QuickActions({ onCreateSurat }) {
  const actions = [
    {
      title: 'Buat Surat Baru',
      description: 'Buat surat dengan nomor otomatis',
      icon: '📝',
      onClick: onCreateSurat,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Import Data',
      description: 'Import surat dari file Excel',
      icon: '📊',
      onClick: () => {/* Handle import */},
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Export Report',
      description: 'Export laporan surat',
      icon: '📄',
      onClick: () => {/* Handle export */},
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Settings',
      description: 'Konfigurasi sistem',
      icon: '⚙️',
      onClick: () => {/* Handle settings */},
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.color} text-white p-4 rounded-lg text-left transition-colors group`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{action.icon}</span>
              <div>
                <h4 className="font-medium mb-1">{action.title}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
