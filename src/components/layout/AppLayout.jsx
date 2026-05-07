import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import NavBar from "./NavBar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#1C1B1C] text-white">
      <Sidebar />
      <main className="flex-1">
        <NavBar />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}