import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { getLeads } from "@/lib/store";
import { Users, UserPlus, Clock, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const [leads] = useState(getLeads());

  const total = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const inProgress = leads.filter(l => l.status === "Contacted" || l.status === "Interested").length;
  const closed = leads.filter(l => l.status === "Closed").length;

  const recentLeads = leads.slice(0, 6);

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome back 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your lead performance today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="Total Leads" value={total} icon={<Users className="w-5 h-5 text-primary" />} iconBg="bg-primary/10" />
          <StatCard title="New Leads" value={newLeads} icon={<UserPlus className="w-5 h-5 text-info" />} iconBg="bg-info/10" />
          <StatCard title="In Progress" value={inProgress} icon={<Clock className="w-5 h-5 text-warning" />} iconBg="bg-warning/10" />
          <StatCard title="Closed Deals" value={closed} icon={<CheckCircle className="w-5 h-5 text-success" />} iconBg="bg-success/10" />
        </div>

        <div className="bg-card rounded-xl card-shadow">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-card-foreground">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">{lead.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{lead.product}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{lead.assignedStaff}</td>
                    <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
