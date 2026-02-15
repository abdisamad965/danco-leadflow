import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  iconBg: string;
}

const StatCard = ({ title, value, icon, iconBg }: StatCardProps) => (
  <div className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-card-foreground mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
