"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Plus, Trash2, FileDown, Calendar, Clock, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Shift {
  id: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  role: string;
}

export default function Home() {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: "1",
      employeeName: "Alice Johnson",
      date: "2024-01-15",
      startTime: "09:00",
      endTime: "17:00",
      role: "Manager",
    },
    {
      id: "2",
      employeeName: "Bob Smith",
      date: "2024-01-15",
      startTime: "10:00",
      endTime: "18:00",
      role: "Cashier",
    },
    {
      id: "3",
      employeeName: "Carol Davis",
      date: "2024-01-16",
      startTime: "08:00",
      endTime: "16:00",
      role: "Sales",
    },
  ]);

  const [formData, setFormData] = useState({
    employeeName: "",
    date: "",
    startTime: "",
    endTime: "",
    role: "",
  });

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeName || !formData.date || !formData.startTime || !formData.endTime) {
      return;
    }

    const newShift: Shift = {
      id: Date.now().toString(),
      employeeName: formData.employeeName,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      role: formData.role || "Staff",
    };

    setShifts([...shifts, newShift]);
    setFormData({ employeeName: "", date: "", startTime: "", endTime: "", role: "" });
  };

  const handleDeleteShift = (id: string) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Shift Schedule", 14, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableData = shifts.map((shift) => [
      shift.employeeName,
      shift.date,
      `${shift.startTime} - ${shift.endTime}`,
      shift.role,
    ]);

    autoTable(doc, {
      head: [["Employee", "Date", "Time", "Role"]],
      body: tableData,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [79, 70, 229] },
    });

    doc.save("shift-schedule.pdf");
  };

  const groupedShifts = shifts.reduce((acc, shift) => {
    if (!acc[shift.date]) acc[shift.date] = [];
    acc[shift.date].push(shift);
    return acc;
  }, {} as Record<string, Shift[]>);

  const sortedDates = Object.keys(groupedShifts).sort();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900">ShiftMaster</h1>
          <p className="text-lg text-gray-600 mt-2">Employee Shift Management</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Shift
          </h2>
          <form onSubmit={handleAddShift} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Shift
              </button>
            </div>
          </form>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role (Optional)</label>
            <input
              type="text"
              placeholder="e.g., Manager, Cashier, Sales"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Shift Schedule</h2>
            <button
              onClick={exportToPDF}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Export PDF
            </button>
          </div>

          {shifts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No shifts scheduled yet.</p>
              <p className="text-sm">Add your first shift above!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedDates.map((date) => (
                <div key={date} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <div className="grid gap-3">
                    {groupedShifts[date]
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((shift) => (
                        <div
                          key={shift.id}
                          className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{shift.employeeName}</p>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {shift.startTime} - {shift.endTime}
                                </span>
                                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                                  {shift.role}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteShift(shift.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete shift"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500 py-4">
          <p>Total Shifts: {shifts.length} | Employees: {new Set(shifts.map((s) => s.employeeName)).size}</p>
        </div>
      </div>
    </main>
  );
}
