import { useState, useEffect } from 'react';
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

export default function SuratForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  userDepartemen, 
  userRole 
}) {
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    departemen: userDepartemen || '',
    perihal: '',
    tujuan: '',
    isi: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        judul: initialData.judul || '',
        kategori: initialData.kategori || '',
        departemen: initialData.departemen || userDepartemen || '',
        perihal: initialData.perihal || '',
        tujuan: initialData.tujuan || '',
        isi: initialData.isi || '',
        status: initialData.status || 'draft'
      });
    }
  }, [initialData, userDepartemen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.judul.trim()) {
      newErrors.judul = 'Judul surat wajib diisi';
    }

    if (!formData.kategori) {
      newErrors.kategori = 'Kategori surat wajib dipilih';
    }

    if (!formData.departemen) {
      newErrors.departemen = 'Departemen wajib dipilih';
    }

    if (!formData.perihal.trim()) {
      newErrors.perihal = 'Perihal surat wajib diisi';
    }

    if (!formData.tujuan.trim()) {
      newErrors.tujuan = 'Tujuan surat wajib diisi';
    }

    if (!formData.isi.trim()) {
      newErrors.isi = 'Isi surat wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Judul */}
      <div>
        <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-1">
          Judul Surat *
        </label>
        <input
          type="text"
          id="judul"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.judul ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Masukkan judul surat"
        />
        {errors.judul && (
          <p className="mt-1 text-sm text-red-600">{errors.judul}</p>
        )}
      </div>

      {/* Kategori dan Departemen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori *
          </label>
          <select
            id="kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.kategori ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Pilih kategori</option>
            {kategoriOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.kategori && (
            <p className="mt-1 text-sm text-red-600">{errors.kategori}</p>
          )}
        </div>

        <div>
          <label htmlFor="departemen" className="block text-sm font-medium text-gray-700 mb-1">
            Departemen *
          </label>
          <select
            id="departemen"
            name="departemen"
            value={formData.departemen}
            onChange={handleChange}
            disabled={userRole !== 'admin'} // Non-admin tidak bisa ubah departemen
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.departemen ? 'border-red-500' : 'border-gray-300'
            } ${userRole !== 'admin' ? 'bg-gray-100' : ''}`}
          >
            <option value="">Pilih departemen</option>
            {departemenOptions.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.departemen && (
            <p className="mt-1 text-sm text-red-600">{errors.departemen}</p>
          )}
        </div>
      </div>

      {/* Perihal dan Tujuan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="perihal" className="block text-sm font-medium text-gray-700 mb-1">
            Perihal *
          </label>
          <input
            type="text"
            id="perihal"
            name="perihal"
            value={formData.perihal}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.perihal ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan perihal surat"
          />
          {errors.perihal && (
            <p className="mt-1 text-sm text-red-600">{errors.perihal}</p>
          )}
        </div>

        <div>
          <label htmlFor="tujuan" className="block text-sm font-medium text-gray-700 mb-1">
            Tujuan *
          </label>
          <input
            type="text"
            id="tujuan"
            name="tujuan"
            value={formData.tujuan}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tujuan ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan tujuan surat"
          />
          {errors.tujuan && (
            <p className="mt-1 text-sm text-red-600">{errors.tujuan}</p>
          )}
        </div>
      </div>

      {/* Status (hanya untuk edit dan admin) */}
      {initialData && userRole === 'admin' && (
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Isi Surat */}
      <div>
        <label htmlFor="isi" className="block text-sm font-medium text-gray-700 mb-1">
          Isi Surat *
        </label>
        <textarea
          id="isi"
          name="isi"
          value={formData.isi}
          onChange={handleChange}
          rows={8}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.isi ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Masukkan isi surat..."
        />
        {errors.isi && (
          <p className="mt-1 text-sm text-red-600">{errors.isi}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Tip: Gunakan format yang jelas dan profesional
        </p>
      </div>

      {/* Preview Nomor Surat */}
      {formData.kategori && formData.departemen && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            📋 Preview Nomor Surat
          </h4>
          <p className="text-sm text-blue-700">
            Format: <code>XXX/{formData.departemen.toUpperCase()}.{formData.kategori.toUpperCase()}/MM/YYYY</code>
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Nomor urut akan digenerate otomatis saat surat disimpan
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Batal
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {initialData ? 'Mengupdate...' : 'Menyimpan...'}
            </>
          ) : (
            <>
              {initialData ? '💾 Update Surat' : '📝 Simpan Surat'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}