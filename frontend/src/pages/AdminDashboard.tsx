import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useComplaintStore } from '../store/complaintStore';
import { LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const complaints = useComplaintStore((state) => state.complaints);
  const updateStatus = useComplaintStore((state) => state.updateStatus);
  const deleteComplaint = useComplaintStore((state) => state.deleteComplaint);
  const fetchComplaints = useComplaintStore((state) => state.fetchComplaints);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-300';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'PENDING').length,
    inProgress: complaints.filter((c) => c.status === 'IN_PROGRESS').length,
    resolved: complaints.filter((c) => c.status === 'RESOLVED').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage all complaints • Admin: {user?.name}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'bg-blue-500' },
            { label: 'Pending', value: stats.pending, color: 'bg-yellow-500' },
            { label: 'In Progress', value: stats.inProgress, color: 'bg-purple-500' },
            { label: 'Resolved', value: stats.resolved, color: 'bg-green-500' },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} text-white rounded-lg shadow p-6`}>
              <p className="text-gray-200 text-sm font-medium">{stat.label}</p>
              <p className="text-4xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Complaints</h2>
          </div>

          {complaints.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-600">No complaints found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted By</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">#{complaint.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{complaint.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{complaint.submittedBy}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{complaint.description}</td>
                      <td className="px-6 py-4">
                        <select
                          value={complaint.status}
                          onChange={(e) => updateStatus(complaint.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(complaint.status)} cursor-pointer`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteComplaint(complaint.id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
