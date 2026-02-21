import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ======================================================
   🔐 ROLE CONFIG (TEMP)
   In real app → comes from AuthContext / JWT
====================================================== */
const USER_ROLE = "FLEET_MANAGER";
// "FLEET_MANAGER" | "DISPATCHER" | "SAFETY_OFFICER" | "FINANCE"

/* ======================================================
   🔐 ANALYTICS PERMISSION MATRIX
====================================================== */
const analyticsPermissions = {
  FLEET_MANAGER: {
    viewKPIs: true,
    viewCharts: true,
    viewFinancialTable: false,
  },
  DISPATCHER: {
    viewKPIs: false,
    viewCharts: false,
    viewFinancialTable: false,
  },
  SAFETY_OFFICER: {
    viewKPIs: false,
    viewCharts: false,
    viewFinancialTable: false,
  },
  FINANCE: {
    viewKPIs: true,
    viewCharts: true,
    viewFinancialTable: true,
  },
};

const permissions = analyticsPermissions[USER_ROLE];

/* ======================================================
   📊 STATIC DATA
====================================================== */
const fuelTrend = [
  { month: "Jan", kmpl: 12 },
  { month: "Feb", kmpl: 14 },
  { month: "Mar", kmpl: 13 },
  { month: "Apr", kmpl: 15 },
  { month: "May", kmpl: 17 },
  { month: "Jun", kmpl: 18 },
];

const costlyVehicles = [
  { name: "VAN-03", cost: 20 },
  { name: "TRK-01", cost: 45 },
  { name: "TRK-07", cost: 65 },
  { name: "TRK-12", cost: 90 },
  { name: "TRK-21", cost: 120 },
];

const monthlyFinance = [
  {
    month: "Jan",
    revenue: "₹17L",
    fuel: "₹6L",
    maintenance: "₹2L",
    profit: "₹9L",
  },
  {
    month: "Feb",
    revenue: "₹18L",
    fuel: "₹7L",
    maintenance: "₹2.5L",
    profit: "₹8.5L",
  },
];

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* ======================================================
     🚫 FULL PAGE ACCESS BLOCK
  ====================================================== */
  if (
    !permissions.viewKPIs &&
    !permissions.viewCharts &&
    !permissions.viewFinancialTable
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-white p-8 rounded-xl shadow text-red-600 font-semibold text-lg">
          You do not have access to Analytics.
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

        {/* Top bar */}
        <div className="flex items-center mb-6">
          <button
            className="md:hidden text-purple-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>

        {/* ================= KPI CARDS ================= */}
        {permissions.viewKPIs && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Total Fuel Cost", value: "₹2.6 L" },
              { title: "Fleet ROI", value: "+12.5%" },
              { title: "Utilization Rate", value: "82%" },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow p-6 border border-green-500 text-center"
              >
                <h3 className="text-lg font-semibold text-green-600">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* ================= CHARTS ================= */}
        {permissions.viewCharts && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold mb-4">
                Fuel Efficiency Trend (km/L)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={fuelTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="kmpl"
                    stroke="#7c3aed"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold mb-4">
                Top 5 Costliest Vehicles
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={costlyVehicles}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}

        {/* ================= FINANCIAL TABLE ================= */}
        {permissions.viewFinancialTable && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-center font-semibold text-blue-600 mb-4">
              Financial Summary of Month
            </h3>

            <table className="w-full text-left min-w-[700px]">
              <thead className="border-b text-purple-600">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Revenue</th>
                  <th className="p-3">Fuel Cost</th>
                  <th className="p-3">Maintenance</th>
                  <th className="p-3">Net Profit</th>
                </tr>
              </thead>
              <tbody>
                {monthlyFinance.map((m, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3">{m.month}</td>
                    <td className="p-3">{m.revenue}</td>
                    <td className="p-3">{m.fuel}</td>
                    <td className="p-3">{m.maintenance}</td>
                    <td className="p-3 font-semibold text-green-600">
                      {m.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default Analytics;