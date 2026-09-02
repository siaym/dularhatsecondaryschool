export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-3xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Welcome to the Admin Panel</h2>
        <p className="text-gray-600 mb-6">
          Manage the school&apos;s website content from this dashboard.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-1">Notices</h3>
            <p className="text-sm text-gray-500">Publish and manage school announcements and attachments.</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-1">Gallery</h3>
            <p className="text-sm text-gray-500">Upload event photos and manage the school gallery.</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-1">Teachers & Staff</h3>
            <p className="text-sm text-gray-500">Maintain the directory of active personnel.</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
            <p className="text-sm text-gray-500">Update global configuration like the headmaster's name.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
