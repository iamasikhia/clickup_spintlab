import {
  LucideBanknote,
  LucideCircleCheck,
  LucideClock,
  LucideReceiptText,
} from "lucide-react";
import { BigCard } from "@/components/big-card";
import { Heading } from "@/components/heading";
import { SmallCard } from "@/components/small-card";

const Dashboard = () => {
  return (
    <div>
      <Heading
        title="Dashboard"
        description="Overview of your projects, hours, and invoices"
      />

      <div className="m-8 grid grid-cols-4 grid-rows-3 gap-4">
        <SmallCard
          title="Active Tasks"
          icon={<LucideCircleCheck className="h-6 w-6" />}
          value="2"
          descriptor="Projects in progress"
        />
        <SmallCard
          title="Total Hours"
          icon={<LucideClock className="h-6 w-6" />}
          value="13.5"
          descriptor="Hours tracked this month"
        />
        <SmallCard
          title="Total Earnings"
          icon={<LucideBanknote className="h-6 w-6" />}
          value="$1012.50"
          descriptor="Revenue this month"
        />
        <SmallCard
          title="Pending Invoices"
          icon={<LucideReceiptText className="h-6 w-6" />}
          value="0"
          descriptor="Awaiting payment"
        />
        <BigCard title="Recent Time Logs" />
        <BigCard title="Recent Invoices" />
      </div>
    </div>
  );
};

export default Dashboard;
