import React, { useState } from "react";
import { Menu, X, Search, Trash2, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

/* ======================================================
   🔐 ROLE CONFIG (TEMP)
   In real app → AuthContext / JWT
====================================================== */
const USER_ROLE = "DISPATCHER";
// "FLEET_MANAGER" | "DISPATCHER" | "SAFETY_OFFICER" | "FINANCE"

/* ======================================================
   🔐 TRIP & EXPENSE PERMISSIONS
====================================================== */
const tripExpensePermissions = {
  FLEET_MANAGER: {
    view: true,
    add: false,
    delete: false,
    search: true,
  },
  DISPATCHER: {
    view: true,
    add: true,
    delete: false,
    search: true,
  },
  SAFETY_OFFICER: {
    view: false,
    add: false,
    delete: false,
    search: false,
  },
  FINANCE: {
    view: true,
    add: false,
    delete: false,
    search: true,
  },
};

const permissions = tripExpensePermissions[USER_ROLE];

const TripExpense = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [expenses, setExpenses] = useState([
    {
      id: 321,
      driver: "John",
      distance: "1000 km",
      fuel: "19000",
      misc: "3000",
      status: "Done",
    },
  ]);

  const [formData, setFormData] = useState({
    tripId: "",
    driver: "",
    distance: "",
    fuel: "",
    misc: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses([
      ...expenses,
      {
        id: formData.tripId,
        driver: formData.driver,
        distance: formData.distance,
        fuel: formData.fuel,
        misc: formData.misc,
        status: "Done",
      },
    ]);
    setShowForm(false);
    setFormData({
      tripId: "",
      driver: "",
      distance: "",
      fuel: "",
      misc: "",
    });
  };

  const handleDelete = (id) =>
    setExpenses(expenses.filter((e) => e.id !== id));

  const filteredExpenses = expenses.filter(
    (e) =>
      e.id.toString().includes(searchTerm) ||
      e.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ======================================================
     🚫 FULL PAGE BLOCK (Safety Officer)
  ====================================================== */
  if (!permissions.view) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-white p-8 rounded-xl shadow text-red-600 font-semibold text-lg">
          You do not have access to Trip & Expense.
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

          {permissions.add && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              <Plus size={18} /> Add an Expense
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
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b text-purple-600">
              <tr>
                <th className="p-4">Trip ID</th>
                <th className="p-4">Driver</th>
                <th className="p-4">Distance</th>
                <th className="p-4">Fuel Expense</th>
                <th className="p-4">Misc. Expense</th>
                <th className="p-4">Status</th>
                {permissions.delete && <th className="p-4">Action</th>}
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.map((e) => (
                <tr key={e.id} className="border-t hover:bg-purple-50">
                  <td className="p-4 text-purple-600 font-semibold">{e.id}</td>
                  <td className="p-4">{e.driver}</td>
                  <td className="p-4">{e.distance}</td>
                  <td className="p-4">₹{e.fuel}</td>
                  <td className="p-4">₹{e.misc}</td>
                  <td className="p-4 text-green-600 font-semibold">
                    {e.status}
                  </td>

                  {permissions.delete && (
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(e.id)}
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

          {filteredExpenses.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No expense records found.
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL FORM (Dispatcher only) ================= */}
      {permissions.add && showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-purple-700 mb-6">
              New Expense
            </h2>

            <form onSubmit={handleAddExpense} className="space-y-4">
              {["tripId", "driver", "distance", "fuel", "misc"].map((field) => (
                <input
                  key={field}
                  type={field === "fuel" || field === "misc" ? "number" : "text"}
                  name={field}
                  placeholder={field.toUpperCase()}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-400 outline-none"
                />
              ))}

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
                  className="px-4 py-2 rounded-lg bg-green-500 text-white"
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

export default TripExpense;