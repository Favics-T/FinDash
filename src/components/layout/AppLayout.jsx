import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from './Nav/Navbar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background text-on-background">
      <Sidebar />
      <main className="flex-1 ml-[264px] flex flex-col">
        <Navbar />
        <div className="p-lg flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}