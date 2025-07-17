'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import SuratTable from '../../../components/SuratTable';
import SuratForm from '../../../components/SuratForm';
import FilterControls from '../../../components/FilterControls';
import Modal from '../../../components/Modal';

export default function SuratPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSurat, setEditingSurat] = useState(null);
  const [filters, setFilters] = useState({
    bulan: '',
    tahun: new Date().getFullYear().toString(),
    departemen: '',
    kategori: '',
    status: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Redirect jika belum login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Fetch data surat
  const fetchSurat = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        )
      });

      const response = await fetch(`/api/surat?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setSurat(data.surat);
        setPagination(data.pagination);
      } else {
        console.error('Error fetching surat:', data.error);
      }
    } catch (error) {
      console.error('Error fetching surat:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSurat();
    }
  }, [status, filters, pagination.page, fetchSurat]);

  const handleCreateSurat = () => {
    setEditingSurat(null);
    setShowForm(true);
  };

  const handleEditSurat = (surat) => {
    setEditingSurat(surat);
    setShowForm(true);
  };

  const handleDeleteSurat = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus surat ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/surat/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchSurat(); // Refresh data
      } else {
        const data = await response.json();
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting surat:', error);
      alert('Terjadi kesalahan saat menghapus surat');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const url = editingSurat ? `/api/surat/${editingSurat.id}` : '/api/surat';
      const method = editingSurat ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowForm(false);
        setEditingSurat(null);
        fetchSurat(); // Refresh data
      } else {
        const data = await response.json();
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving surat:', error);
      alert('Terjadi kesalahan saat menyimpan surat');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset ke halaman pertama
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <DashboardLayout title="Documents Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Documents
            </h2>
            <p className="text-gray-600 mt-1">
              Create, edit, and manage all your documents
            </p>
          </div>
          <button
            onClick={handleCreateSurat}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            ➕ Create New Document
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            userRole={session?.user?.role}
            userDepartemen={session?.user?.departemen}
          />
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <SuratTable
            surat={surat}
            loading={loading}
            onEdit={handleEditSurat}
            onDelete={handleDeleteSurat}
            pagination={pagination}
            onPageChange={handlePageChange}
            userRole={session?.user?.role}
            userId={session?.user?.id}
          />
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingSurat(null);
        }}
        title={editingSurat ? 'Edit Document' : 'Create New Document'}
      >
        <SuratForm
          initialData={editingSurat}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingSurat(null);
          }}
          userDepartemen={session?.user?.departemen}
          userRole={session?.user?.role}
        />
      </Modal>
    </DashboardLayout>
  );
}
