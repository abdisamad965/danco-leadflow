export interface Lead {
  id: string;
  name: string;
  phone: string;
  product: string;
  location: string;
  assignedStaff: string;
  status: "New" | "Contacted" | "Interested" | "Closed" | "Not Reachable";
  createdAt: string;
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
  department: string;
  active: boolean;
}
