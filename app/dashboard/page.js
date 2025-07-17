'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentDocuments from '../../components/dashboard/RecentDocuments';
import SuratForm from '../../components/SuratForm';
import Modal from '../../components/Modal';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSurat, setEditingSurat] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    thisMonth: 0
  });

  // Redirect jika belum login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Fetch data surat dan statistik
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent documents
      const suratResponse = await fetch('/api/surat?limit=10');
      const suratData = await suratResponse.json();

      if (suratResponse.ok) {
        setSurat(suratData.surat);
        
        // Calculate stats
        const total = suratData.pagination.total;
        const pending = suratData.surat.filter(s => s.status === 'pending').length;
        const approved = suratData.surat.filter(s => s.status === 'approved').length;
        
        // Calculate this month's documents
        const thisMonth = suratData.surat.filter(s => {
          const createdDate = new Date(s.createdAt);
          const now = new Date();
          return createdDate.getMonth() === now.getMonth() && 
                 createdDate.getFullYear() === now.getFullYear();
        }).length;

        setStats({ total, pending, approved, thisMonth });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status]);

  const handleCreateSurat = () => {
    setEditingSurat(null);
    setShowForm(true);
  };

  const handleEditSurat = (surat) => {
    setEditingSurat(surat);
    setShowForm(true);
  };

  const handleViewSurat = (surat) => {
    // Navigate to surat detail page or show in modal
    console.log('View surat:', surat);
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
        fetchDashboardData(); // Refresh data
      } else {
        const data = await response.json();
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving surat:', error);
      alert('Terjadi kesalahan saat menyimpan surat');
    }
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
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {session?.user?.name || 'User'}! 👋
          </h2>
          <p className="text-blue-100">
            Here's what's happening with your documents today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Documents"
            value={stats.total.toLocaleString()}
            change="+12.5%"
            changeType="positive"
            description="from last month"
            icon="📄"
          />
          <StatsCard
            title="Pending Approval"
            value={stats.pending.toLocaleString()}
            change="-5.2%"
            changeType="negative"
            description="from last week"
            icon="⏳"
          />
          <StatsCard
            title="Approved"
            value={stats.approved.toLocaleString()}
            change="+8.1%"
            changeType="positive"
            description="this month"
            icon="✅"
          />
          <StatsCard
            title="This Month"
            value={stats.thisMonth.toLocaleString()}
            change="+15.3%"
            changeType="positive"
            description="vs last month"
            icon="📈"
          />
        </div>

        {/* Quick Actions and Recent Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions onCreateSurat={handleCreateSurat} />
          </div>

          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <RecentDocuments
              surat={surat}
              onEdit={handleEditSurat}
              onView={handleViewSurat}
            />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Created', document: 'Surat Undangan Rapat', time: '2 hours ago', user: 'John Doe' },
              { action: 'Approved', document: 'Surat Permohonan', time: '4 hours ago', user: 'Jane Smith' },
              { action: 'Updated', document: 'Surat Keterangan', time: '1 day ago', user: 'Bob Wilson' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()} <span className="font-medium">{activity.document}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingSurat(null);
        }}
        title={editingSurat ? 'Edit Surat' : 'Buat Surat Baru'}
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
