import { useState } from 'react';
import Button from './ui/Button';

const kategoriOptions = [
  { value: 'internal', label: 'Internal' },
  { value: 'eksternal', label: 'Eksternal' },
  { value: 'undangan', label: 'Undangan' },
  { value: 'pengumuman', label: 'Pengumuman' },
  { value: 'surat_tugas', label: 'Surat Tugas' },
  { value: 'surat_keputusan', label: 'Surat Keputusan' }
];

const departemenOptions = [
  'HRD',
  'IT',
  'Finance',
  'Marketing',
  'Operations',
  'Legal',
  'Admin'
];

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Review' },
  { value: 'approved', label: 'Disetujui' },
  { value: 'sent', label: 'Terkirim' },
  { value: 'archived', label: 'Arsip' }
];

const bulanOptions = [
  { value: '1', label: 'Januari' },
  { value: '2', label: 'Februari' },
  { value: '3', label: 'Maret' },
  { value: '4', label: 'April' },
  { value: '5', label: 'Mei' },
  { value: '6', label: 'Juni' },
  { value: '7', label: 'Juli' },
  { value: '8', label: 'Agustus' },
  { value: '9', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Desember' }
];

export default function FilterControls({ 
  filters, 
  onFilterChange, 
  userRole, 
  userDepartemen 
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...localFilters,
      [name]: value
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      bulan: '',
      tahun: new Date().getFullYear().toString(),
      departemen: userRole === 'admin' ? '' : userDepartemen,
      kategori: '',
      status: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 5; year--) {
      years.push(year.toString());
    }
    return years;
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.bulan) count++;
    if (localFilters.tahun && localFilters.tahun !== new Date().getFullYear().toString()) count++;
    if (localFilters.departemen && (userRole === 'admin' || localFilters.departemen !== userDepartemen)) count++;
    if (localFilters.kategori) count++;
    if (localFilters.status) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          🔍 Filter Surat
          {getActiveFilterCount() > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFilterCount()} aktif
            </span>
          )}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? '📋 Sederhana' : '⚙️ Lanjutan'}
          </Button>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              🔄 Reset
            </Button>
          )}
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Bulan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bulan
          </label>
          <select
            value={localFilters.bulan}
            onChange={(e) => handleFilterChange('bulan', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua bulan</option>
            {bulanOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tahun */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tahun
          </label>
          <select
            value={localFilters.tahun}
            onChange={(e) => handleFilterChange('tahun', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {generateYearOptions().map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Departemen (hanya untuk admin) */}
        {userRole === 'admin' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departemen
            </label>
            <select
              value={localFilters.departemen}
              onChange={(e) => handleFilterChange('departemen', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua departemen</option>
              {departemenOptions.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={localFilters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua status</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Filter Lanjutan</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                value={localFilters.kategori}
                onChange={(e) => handleFilterChange('kategori', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua kategori</option>
                {kategoriOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Date Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter Cepat
              </label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    handleFilterChange('bulan', (today.getMonth() + 1).toString());
                    handleFilterChange('tahun', today.getFullYear().toString());
                  }}
                >
                  Bulan Ini
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    handleFilterChange('bulan', '');
                    handleFilterChange('tahun', today.getFullYear().toString());
                  }}
                >
                  Tahun Ini
                </Button>
              </div>
            </div>

            {/* Status Quick Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Cepat
              </label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFilterChange('status', 'draft')}
                >
                  Draft
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFilterChange('status', 'sent')}
                >
                  Terkirim
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Filter Aktif:</h4>
          <div className="flex flex-wrap gap-2">
            {localFilters.bulan && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Bulan: {bulanOptions.find(b => b.value === localFilters.bulan)?.label}
                <button
                  onClick={() => handleFilterChange('bulan', '')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {localFilters.tahun && localFilters.tahun !== new Date().getFullYear().toString() && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Tahun: {localFilters.tahun}
                <button
                  onClick={() => handleFilterChange('tahun', new Date().getFullYear().toString())}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {localFilters.departemen && userRole === 'admin' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Departemen: {localFilters.departemen}
                <button
                  onClick={() => handleFilterChange('departemen', '')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {localFilters.kategori && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Kategori: {kategoriOptions.find(k => k.value === localFilters.kategori)?.label}
                <button
                  onClick={() => handleFilterChange('kategori', '')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {localFilters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {statusOptions.find(s => s.value === localFilters.status)?.label}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}