import { Lead } from "@/lib/types";

const statusConfig: Record<Lead["status"], string> = {
  New: "bg-info/10 text-info",
  Contacted: "bg-primary/10 text-primary",
  Interested: "bg-warning/10 text-warning",
  Closed: "bg-success/10 text-success",
  "Not Reachable": "bg-destructive/10 text-destructive",
};

const StatusBadge = ({ status }: { status: Lead["status"] }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status]}`}>
    {status}
  </span>
);

export default StatusBadge;
