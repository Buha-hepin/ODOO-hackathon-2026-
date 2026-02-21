import { useState } from "react";
import { Menu, X } from "lucide-react";
import {NavLink} from "react-router-dom";

/* ======================================================
   🔐 ROLE CONFIG (TEMP)
   In real app → AuthContext / JWT
====================================================== */
const USER_ROLE = "FLEET_MANAGER";
// "FLEET_MANAGER" | "DISPATCHER" | "SAFETY_OFFICER" | "FINANCE"

/* ======================================================
   🔐 TRIP DISPATCHER PERMISSIONS
====================================================== */
const tripDispatcherPermissions = {
  DISPATCHER: {
    view: true,
    create: true,
  },
  FLEET_MANAGER: {
    view: true,
    create: false,
  },
  SAFETY_OFFICER: {
    view: false,
    create: false,
  },
  FINANCE: {
    view: false,
    create: false,
  },
};

const permissions = tripDispatcherPermissions[USER_ROLE];

export default function TripDispatcher() {
  const [trips, setTrips] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    vehicle: "",
    weight: "",
    driver: "",
    origin: "",
    destination: "",
    fuel: "",
  });

  const addTrip = () => {
    if (!form.vehicle || !form.driver) return;

    setTrips([
      ...trips,
      { ...form, id: Date.now(), status: "On Way" },
    ]);

    setForm({
      vehicle: "",
      weight: "",
      driver: "",
      origin: "",
      destination: "",
      fuel: "",
    });
  };

  /* ======================================================
     🚫 FULL PAGE BLOCK
  ====================================================== */
  if (!permissions.view) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-white p-8 rounded-xl shadow text-red-600 font-semibold text-lg">
          You do not have access to Trip Dispatcher.
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
        </div>

        {/* ================= TRIPS TABLE ================= */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto mb-10">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-purple-100 text-purple-700">
              <tr>
                <th className="p-4">Fleet Type</th>
                <th className="p-4">Origin</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {trips.map((trip) => (
                <tr
                  key={trip.id}
                  className="border-b hover:bg-purple-50 transition"
                >
                  <td className="p-4">{trip.vehicle}</td>
                  <td className="p-4">{trip.origin}</td>
                  <td className="p-4">{trip.destination}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {trips.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No trips dispatched yet
            </div>
          )}
        </div>

        {/* ================= NEW TRIP FORM (Dispatcher ONLY) ================= */}
        {permissions.create && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-semibold text-purple-700 mb-6">
              New Trip Form
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { key: "vehicle", placeholder: "Select Vehicle" },
                { key: "weight", placeholder: "Cargo Weight (Kg)" },
                { key: "driver", placeholder: "Select Driver" },
                { key: "origin", placeholder: "Origin Address" },
                { key: "destination", placeholder: "Destination" },
                { key: "fuel", placeholder: "Estimated Fuel Cost" },
              ].map((f) => (
                <input
                  key={f.key}
                  className="bg-purple-100/50 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                />
              ))}
            </div>

            <button
              onClick={addTrip}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              Confirm & Dispatch Trip
            </button>
          </div>
        )}

      </div>
    </div>
  );
}