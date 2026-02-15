import { Lead, Staff } from "./types";

const LEADS_KEY = "danco_leads";
const STAFF_KEY = "danco_staff";
const ASSIGNMENT_INDEX_KEY = "danco_assignment_index";

const defaultStaff: Staff[] = [
  { id: "s1", name: "Sarah Johnson", phone: "+1 555-0101", department: "Sales", active: true },
  { id: "s2", name: "Michael Chen", phone: "+1 555-0102", department: "Sales", active: true },
  { id: "s3", name: "Emily Rodriguez", phone: "+1 555-0103", department: "Support", active: true },
  { id: "s4", name: "David Kim", phone: "+1 555-0104", department: "Sales", active: false },
  { id: "s5", name: "Lisa Patel", phone: "+1 555-0105", department: "Marketing", active: true },
];

const defaultLeads: Lead[] = [
  { id: "l1", name: "James Wilson", phone: "+1 555-1001", product: "Enterprise Suite", location: "New York", assignedStaff: "Sarah Johnson", status: "Contacted", createdAt: "2026-02-14T09:30:00Z" },
  { id: "l2", name: "Anna Martinez", phone: "+1 555-1002", product: "Starter Plan", location: "Los Angeles", assignedStaff: "Michael Chen", status: "New", createdAt: "2026-02-15T08:15:00Z" },
  { id: "l3", name: "Robert Taylor", phone: "+1 555-1003", product: "Pro Plan", location: "Chicago", assignedStaff: "Emily Rodriguez", status: "Interested", createdAt: "2026-02-13T14:45:00Z" },
  { id: "l4", name: "Sophie Brown", phone: "+1 555-1004", product: "Enterprise Suite", location: "Houston", assignedStaff: "Sarah Johnson", status: "Closed", createdAt: "2026-02-12T11:20:00Z" },
  { id: "l5", name: "Kevin Lee", phone: "+1 555-1005", product: "Pro Plan", location: "Phoenix", assignedStaff: "Lisa Patel", status: "Not Reachable", createdAt: "2026-02-14T16:00:00Z" },
  { id: "l6", name: "Maria Garcia", phone: "+1 555-1006", product: "Starter Plan", location: "San Diego", assignedStaff: "Michael Chen", status: "Contacted", createdAt: "2026-02-15T10:30:00Z" },
  { id: "l7", name: "Thomas Anderson", phone: "+1 555-1007", product: "Enterprise Suite", location: "Dallas", assignedStaff: "Emily Rodriguez", status: "New", createdAt: "2026-02-15T07:45:00Z" },
  { id: "l8", name: "Jessica White", phone: "+1 555-1008", product: "Pro Plan", location: "San Jose", assignedStaff: "Sarah Johnson", status: "Interested", createdAt: "2026-02-14T13:10:00Z" },
];

function initializeData() {
  if (!localStorage.getItem(STAFF_KEY)) {
    localStorage.setItem(STAFF_KEY, JSON.stringify(defaultStaff));
  }
  if (!localStorage.getItem(LEADS_KEY)) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(defaultLeads));
  }
}

export function getLeads(): Lead[] {
  initializeData();
  return JSON.parse(localStorage.getItem(LEADS_KEY) || "[]");
}

export function saveLeads(leads: Lead[]) {
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function getStaff(): Staff[] {
  initializeData();
  return JSON.parse(localStorage.getItem(STAFF_KEY) || "[]");
}

export function saveStaff(staff: Staff[]) {
  localStorage.setItem(STAFF_KEY, JSON.stringify(staff));
}

export function addLead(lead: Omit<Lead, "id" | "assignedStaff" | "status" | "createdAt">): Lead {
  const leads = getLeads();
  const staff = getStaff().filter(s => s.active);
  
  let index = parseInt(localStorage.getItem(ASSIGNMENT_INDEX_KEY) || "0");
  const assignedStaff = staff.length > 0 ? staff[index % staff.length].name : "Unassigned";
  localStorage.setItem(ASSIGNMENT_INDEX_KEY, String(index + 1));

  const newLead: Lead = {
    ...lead,
    id: `l${Date.now()}`,
    assignedStaff,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  leads.unshift(newLead);
  saveLeads(leads);
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead["status"]) {
  const leads = getLeads();
  const idx = leads.findIndex(l => l.id === id);
  if (idx !== -1) {
    leads[idx].status = status;
    saveLeads(leads);
  }
}

export function addStaffMember(staff: Omit<Staff, "id">): Staff {
  const all = getStaff();
  const newStaff: Staff = { ...staff, id: `s${Date.now()}` };
  all.push(newStaff);
  saveStaff(all);
  return newStaff;
}

export function updateStaffMember(updated: Staff) {
  const all = getStaff();
  const idx = all.findIndex(s => s.id === updated.id);
  if (idx !== -1) {
    all[idx] = updated;
    saveStaff(all);
  }
}

export function toggleStaffActive(id: string) {
  const all = getStaff();
  const idx = all.findIndex(s => s.id === id);
  if (idx !== -1) {
    all[idx].active = !all[idx].active;
    saveStaff(all);
  }
}
