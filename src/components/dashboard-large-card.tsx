import { Card, CardHeader, CardTitle } from "./ui/card";

type DashboardBigCardProps = {
  title: string;
};

const DashboardBigCard = ({ title }: DashboardBigCardProps) => {
  return (
    <Card className="col-span-2 row-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export { DashboardBigCard };
