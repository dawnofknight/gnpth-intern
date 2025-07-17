'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import StatsCard from '../../../components/dashboard/StatsCard';

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [analyticsData, setAnalyticsData] = useState({
    totalDocuments: 0,
    monthlyGrowth: 0,
    departmentStats: [],
    statusStats: [],
    categoryStats: []
  });

  useEffect(() => {
    // Mock analytics data - replace with real API call
    setAnalyticsData({
      totalDocuments: 1547,
      monthlyGrowth: 12.5,
      departmentStats: [
        { name: 'HR', count: 345, percentage: 22.3 },
        { name: 'Finance', count: 298, percentage: 19.3 },
        { name: 'IT', count: 234, percentage: 15.1 },
        { name: 'Marketing', count: 198, percentage: 12.8 },
        { name: 'Operations', count: 472, percentage: 30.5 }
      ],
      statusStats: [
        { name: 'Approved', count: 892, percentage: 57.7 },
        { name: 'Pending', count: 234, percentage: 15.1 },
        { name: 'Draft', count: 321, percentage: 20.7 },
        { name: 'Rejected', count: 100, percentage: 6.5 }
      ],
      categoryStats: [
        { name: 'Surat Undangan', count: 423, percentage: 27.3 },
        { name: 'Surat Permohonan', count: 356, percentage: 23.0 },
        { name: 'Surat Keterangan', count: 289, percentage: 18.7 },
        { name: 'Surat Pemberitahuan', count: 234, percentage: 15.1 },
        { name: 'Others', count: 245, percentage: 15.9 }
      ]
    });
  }, []);

  const StatChart = ({ title, data, colorClass = "bg-blue-500" }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${colorClass}`} style={{
                backgroundColor: `hsl(${(index * 360) / data.length}, 70%, 50%)`
              }}></div>
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{item.count}</span>
              <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Document Analytics
          </h2>
          <p className="text-gray-600 mt-1">
            Insights and statistics about your document management
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Documents"
            value={analyticsData.totalDocuments.toLocaleString()}
            change={`+${analyticsData.monthlyGrowth}%`}
            changeType="positive"
            description="this month"
            icon="📄"
          />
          <StatsCard
            title="Avg. Processing Time"
            value="2.4 days"
            change="-15%"
            changeType="positive"
            description="faster than last month"
            icon="⏱️"
          />
          <StatsCard
            title="Approval Rate"
            value="89.2%"
            change="+3.1%"
            changeType="positive"
            description="quality improvement"
            icon="✅"
          />
          <StatsCard
            title="Active Users"
            value="156"
            change="+8"
            changeType="positive"
            description="new this month"
            icon="👥"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatChart 
            title="Documents by Department" 
            data={analyticsData.departmentStats}
          />
          <StatChart 
            title="Documents by Status" 
            data={analyticsData.statusStats}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatChart 
            title="Documents by Category" 
            data={analyticsData.categoryStats}
          />
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Document Creation</p>
                  <p className="text-xs text-green-600">↗️ 15% increase this week</p>
                </div>
                <div className="text-2xl">📈</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Approval Speed</p>
                  <p className="text-xs text-blue-600">⚡ 23% faster processing</p>
                </div>
                <div className="text-2xl">⚡</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-900">User Engagement</p>
                  <p className="text-xs text-purple-600">📊 12% more active users</p>
                </div>
                <div className="text-2xl">👤</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.4 days</div>
              <div className="text-sm text-gray-600">Average Processing Time</div>
              <div className="text-xs text-green-600 mt-1">↓ 15% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
              <div className="text-xs text-green-600 mt-1">↑ Excellent performance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
              <div className="text-sm text-gray-600">User Satisfaction</div>
              <div className="text-xs text-green-600 mt-1">↑ 0.3 points improvement</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
