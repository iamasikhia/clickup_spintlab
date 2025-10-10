import {
  LucideBanknote,
  LucideCircleCheck,
  LucideClock,
  LucideReceiptText,
} from "lucide-react";
import { DashboardBigCard } from "@/components/dashboard-large-card";
import { DashboardSmallCard } from "@/components/dashboard-small-card";
import { Heading } from "@/components/heading";

const Dashboard = () => {
  return (
    <div>
      <Heading
        title="Dashboard"
        description="Overview of your projects, hours, and invoices"
      />

      <div className="m-8 grid grid-cols-4 grid-rows-3 gap-4">
        <DashboardSmallCard
          title="Active Tasks"
          icon={<LucideCircleCheck className="h-6 w-6" />}
          value="2"
          descriptor="Projects in progress"
        />
        <DashboardSmallCard
          title="Total Hours"
          icon={<LucideClock className="h-6 w-6" />}
          value="13.5"
          descriptor="Hours tracked this month"
        />
        <DashboardSmallCard
          title="Total Earnings"
          icon={<LucideBanknote className="h-6 w-6" />}
          value="$1012.50"
          descriptor="Revenue this month"
        />
        <DashboardSmallCard
          title="Pending Invoices"
          icon={<LucideReceiptText className="h-6 w-6" />}
          value="0"
          descriptor="Awaiting payment"
        />
        <DashboardBigCard title="Recent Time Logs" />
        <DashboardBigCard title="Recent Invoices" />
      </div>
    </div>
  );
};

export default Dashboard;
