// app/patient-dashboard/layout.tsx
import type { Metadata } from "next";
import "../../app/globals.css";
import Header from "./patient-dashboard/components/Header";
import Sidebar from "./patient-dashboard/components/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";

export const metadata: Metadata = {
  title: "Patient Dashboard - HealthBridge",
  description: "Manage your appointments, medical records, prescriptions, and more with HealthBridge patient dashboard",
  keywords: ["patient portal", "medical records", "appointments", "healthcare", "Africa healthcare"],
};

export default function PatientsDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
    <div className="flex h-screen bg-gradient-to-b from-slate-50 to-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
}