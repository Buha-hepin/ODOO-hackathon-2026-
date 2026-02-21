import React, { useState } from "react";
import { Menu, X, Search, Trash2, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
/* ======================================================
   🔐 ROLE CONFIG (TEMP)
   In real app → AuthContext / JWT
====================================================== */
const USER_ROLE = "FLEET_MANAGER";
// "FLEET_MANAGER" | "DISPATCHER" | "SAFETY_OFFICER" | "FINANCE"

/* ======================================================
   🔐 MAINTENANCE PERMISSIONS
====================================================== */
const maintenancePermissions = {
  FLEET_MANAGER: {
    view: true,
    add: true,
    delete: true,
    search: true,
  },
  SAFETY_OFFICER: {
    view: true,
    add: true,
    delete: true,
    search: true,
  },
  DISPATCHER: {
    view: true,
    add: false,
    delete: false,
    search: true,
  },
  FINANCE: {
    view: true,
    add: false,
    delete: false,
    search: false,
  },
};

const permissions = maintenancePermissions[USER_ROLE];

const Maintenance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [services, setServices] = useState([
    {
      id: 321,
      vehicle: "TATA",
      issue: "Engine Issue",
      date: "2026-02-20",
      cost: "10000",
      status: "New",
    },
  ]);

  const [formData, setFormData] = useState({
    vehicle: "",
    issue: "",
    date: "",
    cost: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddService = (e) => {
    e.preventDefault();
    setServices([
      ...services,
      { id: Date.now(), ...formData, status: "New" },
    ]);
    setShowForm(false);
    setFormData({ vehicle: "", issue: "", date: "", cost: "" });
  };

  const handleDelete = (id) =>
    setServices(services.filter((s) => s.id !== id));

  const filteredServices = services.filter(
    (s) =>
      s.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ======================================================
     🚫 FULL PAGE BLOCK
  ====================================================== */
  if (!permissions.view) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-white p-8 rounded-xl shadow text-red-600 font-semibold text-lg">
          You do not have access to Maintenance.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 flex relative">

      {/* ================= Sidebar ================= */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-purple-700">Fleet Flow</h2>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-4 text-gray-600 flex-1">
         <NavLink to="/dashboard"> <div className="font-semibold hover:bg-purple-100 hover:text-purple-700 px-2  py-2 rounded-lg cursor-pointer transition">dashboard</div></NavLink>
         <NavLink to="/vehicle-registry"> <div className="font-semibold hover:bg-purple-100 hover:text-purple-700px-4 px-2 py-2 rounded-lg cursor-pointer transition">Vehicle Registry</div></NavLink>
         <NavLink to="/trip-dispatcher"> <div className="font-semibold hover:bg-purple-100 hover:text-purple-700px-4 px-2 py-2 rounded-lg cursor-pointer transition">Trip Dispatcher</div></NavLink>
         <NavLink to="/maintenance"> <div className="font-semibold hover:bg-purple-100 hover:text-purple-700px-4 py-2 px-2 rounded-lg cursor-pointer transition">Maintenance</div></NavLink> 
          <NavLink to="/trip-expense"> <div className="font-semibold hover:bg-purple-100 hover:text-purple-700px-4 py-2 px-2 rounded-lg cursor-pointer transition">Trip & Expense</div></NavLink>
          <NavLink to="/performance"> <div className="font-semibold hover:bg-purple-100 hover:text-purple-700px-4 py-2  px-2 rounded-lg cursor-pointer transition">Performance</div></NavLink>
          <NavLink to="/analytics"> <div className="font-semibold hover:bg-purple-100 hover:text-purple-700px-4 py-2 px-2 rounded-lg cursor-pointer transition">Analytics</div></NavLink>
        </nav>
        
      </div>

      {/* ================= Main ================= */}
      <div className="flex-1 p-6 w-full">

        {/* Top Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="md:hidden text-purple-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={26} />
          </button>

          {permissions.add && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              <Plus size={18} /> Create New Service
            </button>
          )}
        </div>

        {/* Search */}
        {permissions.search && (
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search bar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-500"
              />
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b text-purple-600">
              <tr>
                <th className="p-4">Log ID</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Issue / Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Status</th>
                {permissions.delete && <th className="p-4">Action</th>}
              </tr>
            </thead>

            <tbody>
              {filteredServices.map((s) => (
                <tr key={s.id} className="border-t hover:bg-purple-50">
                  <td className="p-4 text-purple-600 font-semibold">
                    {s.id}
                  </td>
                  <td className="p-4 text-blue-600 font-semibold">
                    {s.vehicle}
                  </td>
                  <td className="p-4">{s.issue}</td>
                  <td className="p-4">{s.date}</td>
                  <td className="p-4">₹{s.cost}</td>
                  <td className="p-4 text-green-600 font-semibold">
                    {s.status}
                  </td>

                  {permissions.delete && (
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {filteredServices.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No service logs found.
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL FORM ================= */}
      {permissions.add && showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-purple-700 mb-6">
              New Service
            </h2>

            <form onSubmit={handleAddService} className="space-y-4">
              <input
                type="text"
                name="vehicle"
                placeholder="Vehicle Name"
                value={formData.vehicle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
              />

              <input
                type="text"
                name="issue"
                placeholder="Issue / Service"
                value={formData.issue}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
              />

              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={formData.cost}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Maintenance;