// app/hospital/layout.tsx
import type { Metadata } from "next";
import "../../app/globals.css";
import Header from "./hospital-dashboard/components/Header";
import Sidebar from "./hospital-dashboard/components/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";

export const metadata: Metadata = {
  title: "Hospital Dashboard - HealthBridge",
  description: "Hospital management dashboard for managing patients, appointments, queue, and healthcare operations",
  keywords: ["hospital management", "patient management", "appointments", "healthcare", "hospital dashboard", "medical records"],
};

export default function HospitalLayout({
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
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}