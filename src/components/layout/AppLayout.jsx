import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { NavBar } from './Nav/NavBar.jsx';
import { useFetchCoins } from "../../hooks/useFetchCoins";

export default function AppLayout() {
  useFetchCoins();
  return (
    <div className="flex min-h-screen bg-background text-on-background">
      <Sidebar />
      <main className="flex-1 ml-66 flex flex-col">
        <NavBar />
        <div className="p-lg flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}