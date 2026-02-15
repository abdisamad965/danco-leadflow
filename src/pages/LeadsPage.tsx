import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import StatusBadge from "@/components/StatusBadge";
import { getLeads, addLead, updateLeadStatus } from "@/lib/store";
import { Lead } from "@/lib/types";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const statuses: Lead["status"][] = ["New", "Contacted", "Interested", "Closed", "Not Reachable"];

const LeadsPage = () => {
  const [leads, setLeads] = useState(getLeads());
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", product: "", location: "" });
  const { toast } = useToast();

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.product.toLowerCase().includes(search.toLowerCase()) ||
    l.assignedStaff.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.phone) return;
    addLead(form);
    setLeads(getLeads());
    setForm({ name: "", phone: "", product: "", location: "" });
    setOpen(false);
    toast({
      title: "Lead assigned successfully ✅",
      description: "Lead assigned successfully via WhatsApp",
    });
  };

  const handleStatusChange = (id: string, status: Lead["status"]) => {
    updateLeadStatus(id, status);
    setLeads(getLeads());
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leads</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{leads.length} total leads</p>
          </div>
          <Button onClick={() => setOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Lead
          </Button>
        </div>

        <div className="bg-card rounded-xl card-shadow">
          <div className="px-6 py-4 border-b border-border">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Name", "Phone", "Product", "Location", "Assigned Staff", "Status", "Date"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <p className="text-muted-foreground text-sm">No leads found</p>
                      <p className="text-muted-foreground/60 text-xs mt-1">Add your first lead to get started</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map(lead => (
                    <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-card-foreground">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{lead.phone}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{lead.product}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{lead.location}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{lead.assignedStaff}</td>
                      <td className="px-6 py-4">
                        <Select value={lead.status} onValueChange={(v) => handleStatusChange(lead.id, v as Lead["status"])}>
                          <SelectTrigger className="w-[140px] h-8 border-0 bg-transparent p-0 focus:ring-0">
                            <StatusBadge status={lead.status} />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Input placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <Input placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              <Input placeholder="Product" value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} />
              <Input placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              <Button onClick={handleAdd} className="w-full">Add Lead</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default LeadsPage;
