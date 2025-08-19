export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-lg shadow text-white">
        <h2 className="text-lg font-bold">Total Members</h2>
        <p className="text-3xl mt-2 font-bold">120</p>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-lg shadow text-white">
        <h2 className="text-lg font-bold">Active Packages</h2>
        <p className="text-3xl mt-2 font-bold">45</p>
      </div>
      <div className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-lg shadow text-white">
        <h2 className="text-lg font-bold">Pending Payments</h2>
        <p className="text-3xl mt-2 font-bold">8</p>
      </div>
    </div>
  );
}
