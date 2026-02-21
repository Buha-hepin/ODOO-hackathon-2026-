import React, { useState } from "react";
import { Menu, X, Search, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";


/* ======================================================
   🔐 ROLE CONFIG (TEMP)
   Replace later with AuthContext / JWT
====================================================== */
const USER_ROLE = "FLEET_MANAGER";
// "FLEET_MANAGER" | "DISPATCHER" | "SAFETY_OFFICER" | "FINANCE"

/* ======================================================
   🔐 VEHICLE REGISTRY PERMISSIONS
====================================================== */
const vehiclePermissions = {
  FLEET_MANAGER: {
    view: true,
    create: true,
    delete: true,
    search: true,
  },
  DISPATCHER: {
    view: false,
    create: false,
    delete: false,
    search: false,
  },
  SAFETY_OFFICER: {
    view: true,
    create: false,
    delete: false,
    search: false,
  },
  FINANCE: {
    view: true,
    create: false,
    delete: false,
    search: false,
  },
};

const permissions = vehiclePermissions[USER_ROLE];

const VehicleRegistry = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plate: "MH 00",
      model: "2017",
      type: "Mini",
      capacity: "5 ton",
      odometer: "79000",
      status: "Idle",
    },
  ]);

  const [formData, setFormData] = useState({
    plate: "",
    model: "",
    type: "",
    capacity: "",
    odometer: "",
  });

  const handleAddVehicle = (e) => {
    e.preventDefault();
    setVehicles([
      ...vehicles,
      { id: Date.now(), ...formData, status: "Idle" },
    ]);
    setShowForm(false);
    setFormData({
      plate: "",
      model: "",
      type: "",
      capacity: "",
      odometer: "",
    });
  };

  const handleDelete = (id) =>
    setVehicles(vehicles.filter((v) => v.id !== id));

  const filteredVehicles = permissions.search
    ? vehicles.filter((v) =>
        v.plate.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : vehicles;

  /* ======================================================
     🚫 FULL PAGE BLOCK
  ====================================================== */
  if (!permissions.view) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-white p-8 rounded-xl shadow text-red-600 font-semibold text-lg">
          You do not have access to Vehicle Registry.
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

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden text-purple-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={26} />
          </button>

          {permissions.create && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              + New Vehicle
            </button>
          )}
        </div>

        {/* Search */}
        {permissions.search && (
          <div className="relative mb-6 max-w-sm">
            <input
              type="text"
              placeholder="Search by plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-purple-100 text-purple-700">
              <tr>
                <th className="p-4">Plate</th>
                <th className="p-4">Model</th>
                <th className="p-4">Type</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Odometer</th>
                <th className="p-4">Status</th>
                {permissions.delete && <th className="p-4">Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="border-t hover:bg-purple-50">
                  <td className="p-4">{v.plate}</td>
                  <td className="p-4">{v.model}</td>
                  <td className="p-4">{v.type}</td>
                  <td className="p-4">{v.capacity}</td>
                  <td className="p-4">{v.odometer}</td>
                  <td className="p-4">{v.status}</td>

                  {permissions.delete && (
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(v.id)}
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

          {filteredVehicles.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No vehicles found.
            </div>
          )}
        </div>
      </div>

      {/* ================= CREATE VEHICLE MODAL ================= */}
      {permissions.create && showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-purple-700 mb-6">
              New Vehicle Registration
            </h2>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              {["plate", "model", "type", "capacity", "odometer"].map((f) => (
                <input
                  key={f}
                  type="text"
                  placeholder={f.toUpperCase()}
                  value={formData[f]}
                  onChange={(e) =>
                    setFormData({ ...formData, [f]: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
                />
              ))}

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleRegistry;