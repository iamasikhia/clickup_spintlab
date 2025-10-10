import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type SmallCardProps = {
  title: string;
  icon: React.ReactNode;
  value: string;
  descriptor: string;
};

const DashboardSmallCard = ({
  title,
  icon,
  value,
  descriptor,
}: SmallCardProps) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="font-semibold text-2xl">{value}</span>
          <span className="text-sm text-gray-600">{descriptor}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export { DashboardSmallCard };
