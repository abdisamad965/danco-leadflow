import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
