import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const USER_ROLE = "SAFETY_OFFICER";

const dashboardPermissions = {
  FLEET_MANAGER: {
    viewKPIs: true,
    viewTrips: true,
    searchFilterSort: true,
    newTrip: false,
    newVehicle: true,
  },
  DISPATCHER: {
    viewKPIs: true,
    viewTrips: true,
    searchFilterSort: true,
    newTrip: true,
    newVehicle: false,
  },
  SAFETY_OFFICER: {
    viewKPIs: "limited",
    viewTrips: "limited",
    searchFilterSort: false,
    newTrip: false,
    newVehicle: false,
  },
  FINANCE: {
    viewKPIs: "very-limited",
    viewTrips: "minimal",
    searchFilterSort: false,
    newTrip: false,
    newVehicle: false,
  },
};

const permissions = dashboardPermissions[USER_ROLE];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [user, setUser] = useState(null);

  // Get user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    "Dashboard",
    "Vehicle Registry",
    "Trip Dispatcher",
    "Maintenance",
    "Trip & Expense",
    "Performance",
    "Analytics",
  ];

  const tripsData = [
    { id: 1, vehicle: "TRK-001", driver: "John Doe", status: "On Trip" },
    { id: 2, vehicle: "TRK-002", driver: "Alex Smith", status: "Completed" },
    { id: 3, vehicle: "TRK-003", driver: "Rahul Kumar", status: "Pending" },
    { id: 4, vehicle: "TRK-004", driver: "David Lee", status: "On Trip" },
    { id: 5, vehicle: "TRK-005", driver: "Chris Evans", status: "Completed" },
  ];

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");

    // Redirect to login
    navigate("/login");
  };

  const filteredTrips = tripsData
    .filter((trip) =>
      trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((trip) =>
      statusFilter === "All" ? true : trip.status === statusFilter
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.id - b.id : b.id - a.id
    );

  return (
    <div className="min-h-screen bg-purple-50 flex relative">

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-purple-700">
            Fleet Flow
          </h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
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

         
        

        {/* User Info & Logout */}
        <div className="border-t pt-4 space-y-4">
          {user && (
            <div className="bg-white-500 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 w-full">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="md:hidden text-purple-700"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={26} />
          </button>
          <h1 className="text-2xl font-bold text-purple-700 hidden md:block">
            Dashboard
          </h1>
        </div>

        {/* Controls */}
         {permissions.searchFilterSort && (
        <div className="flex flex-wrap gap-3 mb-6">

    {/* Search */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search by vehicle..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-lg bg-purple-200 focus:bg-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
      />
      <Search
        size={18}
        className="absolute left-3 top-2.5 text-gray-500"
      />
    </div>

    {/* Status Filter */}
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="px-4 py-2 rounded-lg bg-purple-200 focus:ring-2 focus:ring-purple-400 outline-none"
    >
      <option>All</option>
      <option>On Trip</option>
      <option>Completed</option>
      <option>Pending</option>
    </select>

    {/* Sort */}
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="px-4 py-2 rounded-lg bg-purple-200 focus:ring-2 focus:ring-purple-400 outline-none"
    >
      <option value="asc">Sort: Ascending</option>
      <option value="desc">Sort: Descending</option>
    </select>

  </div>
)}

        
       {/* Stats Cards */}
          {permissions.viewKPIs && (
  <div className="grid md:grid-cols-3 gap-6 mb-8">

    {(permissions.viewKPIs === true ||
      permissions.viewKPIs === "limited" ||
      permissions.viewKPIs === "very-limited") && (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h3 className="text-gray-500 mb-2">Active Fleet</h3>
        <p className="text-3xl font-bold text-purple-700">220</p>
      </div>
    )}

    {(permissions.viewKPIs === true ||
      permissions.viewKPIs === "limited") && (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h3 className="text-gray-500 mb-2">Maintenance Alert</h3>
        <p className="text-3xl font-bold text-purple-700">180</p>
      </div>
    )}

    {permissions.viewKPIs === true && (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h3 className="text-gray-500 mb-2">Pending Cargo</h3>
        <p className="text-3xl font-bold text-purple-700">20</p>
      </div>
    )}

  </div>
          )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-purple-100 text-purple-700">
        <tr>
          <th className="p-4">Trip</th>

          {permissions.viewTrips !== "minimal" && (
            <th className="p-4">Vehicle</th>
          )}

          {(permissions.viewTrips === true ||
            permissions.viewTrips === "limited") && (
            <th className="p-4">Driver</th>
          )}

          <th className="p-4">Status</th>
        </tr>
            </thead>
            <tbody className="text-gray-600">
  {filteredTrips.map((trip) => (
    <tr key={trip.id} className="hover:bg-purple-50 transition">
      <td className="p-4 font-medium">{trip.id}</td>

      {permissions.viewTrips !== "minimal" && (
        <td className="p-4">{trip.vehicle}</td>
      )}

      {(permissions.viewTrips === true ||
        permissions.viewTrips === "limited") && (
        <td className="p-4">{trip.driver}</td>
      )}

      <td className="p-4">
        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
          {trip.status}
        </span>
      </td>
    </tr>
  ))}
            </tbody>
          </table>

          {filteredTrips.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No trips found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;