import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

/* ======================================================
   🔐 ROLE CONFIG (TEMP)
   In real app → AuthContext / JWT
====================================================== */
const USER_ROLE = "FLEET_MANAGER";
// "FLEET_MANAGER" | "DISPATCHER" | "SAFETY_OFFICER" | "FINANCE"

/* ======================================================
   🔐 DRIVER PERFORMANCE PERMISSIONS
====================================================== */
const driverPerformancePermissions = {
  FLEET_MANAGER: {
    view: true,
    filters: true,
    viewLicense: false,
  },
  SAFETY_OFFICER: {
    view: true,
    filters: true,
    viewLicense: true,
  },
  DISPATCHER: {
    view: false,
    filters: false,
    viewLicense: false,
  },
  FINANCE: {
    view: false,
    filters: false,
    viewLicense: false,
  },
};

const permissions = driverPerformancePermissions[USER_ROLE];

const DriverPerformance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [minSafety, setMinSafety] = useState("");
  const [sortKey, setSortKey] = useState("");

  const drivers = [
    {
      name: "John",
      license: "23223",
      expiry: "22/36",
      completion: 92,
      safety: 89,
      complaints: 4,
    },
    {
      name: "Alex",
      license: "77412",
      expiry: "18/30",
      completion: 85,
      safety: 75,
      complaints: 7,
    },
    {
      name: "Ravi",
      license: "99321",
      expiry: "25/40",
      completion: 96,
      safety: 94,
      complaints: 1,
    },
  ];

  /* ================= FILTER + SORT ================= */
  const filteredDrivers = drivers
    .filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (permissions.viewLicense && d.license.includes(searchTerm))
    )
    .filter((d) =>
      minSafety ? d.safety >= Number(minSafety) : true
    )
    .sort((a, b) => {
      if (sortKey === "completion") return b.completion - a.completion;
      if (sortKey === "safety") return b.safety - a.safety;
      if (sortKey === "complaints") return a.complaints - b.complaints;
      return 0;
    });

  /* ======================================================
     🚫 FULL PAGE BLOCK
  ====================================================== */
  if (!permissions.view) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-white p-8 rounded-xl shadow text-red-600 font-semibold text-lg">
          You do not have access to Driver Performance.
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
        <div className="flex justify-between items-center mb-4">
          <button
            className="md:hidden text-purple-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>

        {/* ================= Filters ================= */}
        {permissions.filters && (
          <div className="flex flex-wrap gap-3 items-center mb-6">

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-500"
              />
            </div>

            {/* Safety Filter */}
            <select
              value={minSafety}
              onChange={(e) => setMinSafety(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white shadow outline-none"
            >
              <option value="">Min Safety Score</option>
              <option value="70">70+</option>
              <option value="80">80+</option>
              <option value="90">90+</option>
            </select>

            {/* Sort */}
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white shadow outline-none"
            >
              <option value="">Sort by</option>
              <option value="completion">Completion Rate</option>
              <option value="safety">Safety Score</option>
              <option value="complaints">Complaints (Low → High)</option>
            </select>

          </div>
        )}

        {/* ================= Table ================= */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b text-purple-600">
              <tr>
                <th className="p-4">Name</th>

                {permissions.viewLicense && (
                  <th className="p-4">License #</th>
                )}

                <th className="p-4">Expiry</th>
                <th className="p-4">Completion Rate</th>
                <th className="p-4">Safety Score</th>
                <th className="p-4">Complaints</th>
              </tr>
            </thead>

            <tbody>
              {filteredDrivers.map((d, i) => (
                <tr key={i} className="border-t hover:bg-purple-50">
                  <td className="p-4 font-semibold">{d.name}</td>

                  {permissions.viewLicense && (
                    <td className="p-4">{d.license}</td>
                  )}

                  <td className="p-4">{d.expiry}</td>
                  <td className="p-4 text-blue-600 font-semibold">
                    {d.completion}%
                  </td>
                  <td className="p-4 text-green-600 font-semibold">
                    {d.safety}%
                  </td>
                  <td className="p-4 text-red-500 font-semibold">
                    {d.complaints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDrivers.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No drivers match the filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverPerformance;