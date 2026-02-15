import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserCog } from "lucide-react";
import dancoLogo from "@/assets/danco-logo.png";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/staff", label: "Staff", icon: UserCog },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <img src={dancoLogo} alt="Danco" className="w-9 h-9 rounded-lg object-contain bg-white p-0.5" />
        <div>
          <h1 className="text-sidebar-active text-base font-bold tracking-tight">Danco LeadFlow</h1>
          <p className="text-sidebar-foreground text-[11px] leading-tight">Quality • Trust • Innovation</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-hover text-sidebar-active"
                  : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-lg bg-sidebar-hover">
        <p className="text-[11px] text-sidebar-foreground">Demo Mode</p>
        <p className="text-[11px] text-sidebar-foreground/60 mt-0.5">Data stored locally</p>
      </div>
    </aside>
  );
};

export default Sidebar;
