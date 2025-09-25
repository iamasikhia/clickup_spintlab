import { Card, CardHeader, CardTitle } from "./ui/card";

type BigCardProps = {
  title: string;
};

const BigCard = ({ title }: BigCardProps) => {
  return (
    <Card className="col-span-2 row-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export { BigCard };
