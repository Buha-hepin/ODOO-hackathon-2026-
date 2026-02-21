🚚 FleetFlow – Smart Fleet Operations Platform
📌 Objective

FleetFlow replaces inefficient manual logbooks with a centralized, rule-based digital system to manage fleet operations.
The platform optimizes the vehicle lifecycle, driver safety, and financial performance of delivery fleets.

👥 Target Users

Fleet Managers – Vehicle health, lifecycle, and maintenance oversight

Dispatchers – Trip creation, driver assignment, and cargo validation

Safety Officers – Driver compliance, license expiry, and safety monitoring

Financial Analysts – Fuel costs, maintenance ROI, and operational audits


🧩 Core System Modules
1️⃣ Login & Authentication

Secure role-based access (Manager / Dispatcher)

Email & password login with RBAC support

2️⃣ Command Center (Dashboard)

Real-time fleet overview

KPIs: Active Fleet, Maintenance Alerts, Utilization Rate, Pending Cargo

Filters by vehicle type, status, and region

3️⃣ Vehicle Registry

Central asset management system

Stores vehicle details, capacity, and odometer

Manual “Out of Service” toggle for retired vehicles

4️⃣ Trip Dispatcher & Management

Assign available drivers and vehicles

Automatic validation for cargo vs. vehicle capacity

Trip lifecycle: Draft → Dispatched → Completed / Cancelled

5️⃣ Maintenance & Service Logs

Preventive and reactive maintenance tracking

Auto-logic: Vehicle marked “In Shop” and removed from dispatch pool

6️⃣ Expense & Fuel Logging

Fuel and expense tracking per trip

Automatic calculation of total operational cost per vehicle

7️⃣ Driver Performance & Safety Profiles

License expiry tracking (blocks expired drivers)

Safety scores, completion rates, and complaints

Driver status: On Duty / Off Duty / Suspended

8️⃣ Operational Analytics & Reports

Fuel efficiency (km/L)

Vehicle ROI calculation

One-click CSV/PDF export for audits and reports

🔁 System Workflow Summary

Vehicle added → Status: Available

Driver added → License validated

Trip assigned → Capacity check enforced

Trip completed → Vehicle & driver become available

Maintenance logged → Vehicle marked “In Shop”

Analytics updated using trip and expense data

🛠 Technical Stack

Frontend: React (Vite) + Tailwind CSS

Backend: Node.js + Express

Database: Relational schema linking Vehicles, Trips, Drivers, and Expenses
