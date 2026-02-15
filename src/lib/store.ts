import { Lead, Staff } from "./types";

const LEADS_KEY = "danco_leads";
const STAFF_KEY = "danco_staff";
const ASSIGNMENT_INDEX_KEY = "danco_assignment_index";

const defaultStaff: Staff[] = [
  { id: "s1", name: "James Kamau", phone: "+254 712 345 001", department: "Sales", active: true },
  { id: "s2", name: "Grace Wanjiku", phone: "+254 712 345 002", department: "Sales", active: true },
  { id: "s3", name: "Peter Ochieng", phone: "+254 712 345 003", department: "Technical", active: true },
  { id: "s4", name: "Faith Muthoni", phone: "+254 712 345 004", department: "Sales", active: false },
  { id: "s5", name: "Brian Kiprop", phone: "+254 712 345 005", department: "Marketing", active: true },
];

const defaultLeads: Lead[] = [
  { id: "l1", name: "David Mutua", phone: "+254 722 100 201", product: "HDPE Aquaflex Pipes", location: "Nairobi", assignedStaff: "James Kamau", status: "Contacted", createdAt: "2026-02-14T09:30:00Z" },
  { id: "l2", name: "Agnes Nyambura", phone: "+254 733 200 302", product: "PPR Aquaflo Pipes", location: "Mombasa", assignedStaff: "Grace Wanjiku", status: "New", createdAt: "2026-02-15T08:15:00Z" },
  { id: "l3", name: "John Otieno", phone: "+254 710 300 403", product: "Telecom Ducts", location: "Kisumu", assignedStaff: "Peter Ochieng", status: "Interested", createdAt: "2026-02-13T14:45:00Z" },
  { id: "l4", name: "Esther Chebet", phone: "+254 720 400 504", product: "HDPE Aquaflex Pipes", location: "Eldoret", assignedStaff: "James Kamau", status: "Closed", createdAt: "2026-02-12T11:20:00Z" },
  { id: "l5", name: "Samuel Kariuki", phone: "+254 711 500 605", product: "Sanitation Pipes", location: "Nakuru", assignedStaff: "Brian Kiprop", status: "Not Reachable", createdAt: "2026-02-14T16:00:00Z" },
  { id: "l6", name: "Jean Pierre Habimana", phone: "+250 788 600 706", product: "PPR Aquaflo Pipes", location: "Kigali", assignedStaff: "Grace Wanjiku", status: "Contacted", createdAt: "2026-02-15T10:30:00Z" },
  { id: "l7", name: "Wycliffe Barasa", phone: "+254 700 700 807", product: "HDPE Aquaflex Pipes", location: "Thika", assignedStaff: "Peter Ochieng", status: "New", createdAt: "2026-02-15T07:45:00Z" },
  { id: "l8", name: "Diane Uwimana", phone: "+250 722 800 908", product: "Telecom Ducts", location: "Musanze", assignedStaff: "James Kamau", status: "Interested", createdAt: "2026-02-14T13:10:00Z" },
];

const DATA_VERSION = "v2";
const VERSION_KEY = "danco_data_version";

function initializeData() {
  const currentVersion = localStorage.getItem(VERSION_KEY);
  if (currentVersion !== DATA_VERSION) {
    localStorage.removeItem(STAFF_KEY);
    localStorage.removeItem(LEADS_KEY);
    localStorage.removeItem(ASSIGNMENT_INDEX_KEY);
    localStorage.setItem(VERSION_KEY, DATA_VERSION);
  }
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
