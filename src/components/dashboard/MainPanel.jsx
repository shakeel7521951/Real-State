import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MainPanel = () => {
  // Sample data for charts
  const propertyData = [
    { month: "Jan", sales: 5, rentals: 12 },
    { month: "Feb", sales: 8, rentals: 15 },
    { month: "Mar", sales: 12, rentals: 18 },
    { month: "Apr", sales: 9, rentals: 20 },
    { month: "May", sales: 15, rentals: 22 },
    { month: "Jun", sales: 18, rentals: 25 },
  ];

  const userActivityData = [
    { name: "Monday", visits: 24 },
    { name: "Tuesday", visits: 35 },
    { name: "Wednesday", visits: 42 },
    { name: "Thursday", visits: 38 },
    { name: "Friday", visits: 45 },
    { name: "Saturday", visits: 56 },
    { name: "Sunday", visits: 48 },
  ];

  const propertyDistribution = [
    { name: "Apartments", value: 45 },
    { name: "Houses", value: 30 },
    { name: "Villas", value: 15 },
    { name: "Commercial", value: 10 },
  ];
  const COLORS = ["#947054", "#C4A484", "#DEC19B", "#E8E1D9"];

  const stats = [
    {
      title: "Total Properties",
      value: 156,
      change: "+12%",
      icon: "🏠",
      bg: "#f0e6dd",
    },
    {
      title: "Total Users",
      value: 2453,
      change: "+5.3%",
      icon: "👥",
      bg: "#e4d7cc",
    },
    {
      title: "Active Listings",
      value: 87,
      change: "+2.6%",
      icon: "📋",
      bg: "#f5efe7",
    },
    {
      title: "Monthly Revenue",
      value: "$43,652",
      change: "+8.1%",
      icon: "💰",
      bg: "#ebe0d5",
    },
  ];
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* <h2 className="text-2xl font-serif font-semibold mb-6 text-[#947054]">
        Dashboard Overview
      </h2> */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-[#e8e1d9] transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full text-[#947054]`}
                style={{ backgroundColor: stat.bg }}
              >
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 mt-3 font-medium">{stat.title}</p>
            <p className="text-2xl font-bold mt-1 text-[#333333]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Sales & Rentals */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#e8e1d9] transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-[#947054]">
            Property Sales & Rentals
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={propertyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" tick={{ fill: "#666" }} />
                <YAxis tick={{ fill: "#666" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#e8e1d9",
                    borderRadius: "4px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#947054"
                  strokeWidth={2}
                  dot={{
                    stroke: "#947054",
                    strokeWidth: 2,
                    r: 4,
                    fill: "white",
                  }}
                  activeDot={{ r: 8 }}
                  name="Sales"
                />
                <Line
                  type="monotone"
                  dataKey="rentals"
                  stroke="#C4A484"
                  strokeWidth={2}
                  dot={{
                    stroke: "#C4A484",
                    strokeWidth: 2,
                    r: 4,
                    fill: "white",
                  }}
                  name="Rentals"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>{" "}
        {/* User Activity */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#e8e1d9] transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-[#947054]">
            Weekly User Activity
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userActivityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="name" tick={{ fill: "#666" }} />
                <YAxis tick={{ fill: "#666" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#e8e1d9",
                    borderRadius: "4px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="visits"
                  name="User Visits"
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                >
                  {userActivityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#947054" : "#C4A484"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>{" "}
        {/* Property Type Distribution */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#e8e1d9] transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-[#947054]">
            Property Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {propertyDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#e8e1d9",
                    borderRadius: "4px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span className="text-gray-700">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>{" "}
        {/* Recent Activity */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#e8e1d9] transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-[#947054]">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-3 border-l-4 border-[#947054] rounded-r-lg bg-[#f9f7f5] hover:scale-[1.02] transition-transform">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "#f0e6dd" }}
              >
                <span className="text-[#947054] text-xl">🏠</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">New Property Listed</p>
                <p className="text-sm text-gray-600">
                  Villa in Beverly Hills - $1,250,000
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-3 border-l-4 border-[#C4A484] rounded-r-lg bg-[#f9f7f5] hover:scale-[1.02] transition-transform">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "#e4d7cc" }}
              >
                <span className="text-[#947054] text-xl">💰</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Property Sold</p>
                <p className="text-sm text-gray-600">
                  Apartment in Downtown - $450,000
                </p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-3 border-l-4 border-[#DEC19B] rounded-r-lg bg-[#f9f7f5] hover:scale-[1.02] transition-transform">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "#f5efe7" }}
              >
                <span className="text-[#947054] text-xl">👤</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">New User Registered</p>
                <p className="text-sm text-gray-600">
                  Sarah Williams joined the platform
                </p>
                <p className="text-xs text-gray-500 mt-1">Yesterday</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-3 border-l-4 border-[#E8E1D9] rounded-r-lg bg-[#f9f7f5] hover:scale-[1.02] transition-transform">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "#ebe0d5" }}
              >
                <span className="text-[#947054] text-xl">⭐</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">New Review</p>
                <p className="text-sm text-gray-600">
                  5-star review for Seaside Villa
                </p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
