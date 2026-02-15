import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { getStaff, addStaffMember, toggleStaffActive, updateStaffMember } from "@/lib/store";
import { Staff } from "@/lib/types";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const StaffPage = () => {
  const [staff, setStaff] = useState(getStaff());
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Staff | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", department: "" });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", phone: "", department: "" });
    setOpen(true);
  };

  const openEdit = (s: Staff) => {
    setEditing(s);
    setForm({ name: s.name, phone: s.phone, department: s.department });
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.phone) return;
    if (editing) {
      updateStaffMember({ ...editing, ...form });
    } else {
      addStaffMember({ ...form, active: true });
    }
    setStaff(getStaff());
    setOpen(false);
  };

  const handleToggle = (id: string) => {
    toggleStaffActive(id);
    setStaff(getStaff());
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Staff</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{staff.filter(s => s.active).length} active members</p>
          </div>
          <Button onClick={openAdd} className="gap-2">
            <Plus className="w-4 h-4" /> Add Staff
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {staff.map(s => (
            <div key={s.id} className="bg-card rounded-xl p-5 card-shadow hover:card-shadow-hover transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {s.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.department}</p>
                  </div>
                </div>
                <button onClick={() => openEdit(s)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.phone}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{s.active ? "Active" : "Inactive"}</span>
                  <Switch checked={s.active} onCheckedChange={() => handleToggle(s.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Staff" : "Add Staff Member"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Input placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <Input placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              <Input placeholder="Department" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
              <Button onClick={handleSave} className="w-full">{editing ? "Save Changes" : "Add Staff"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default StaffPage;
