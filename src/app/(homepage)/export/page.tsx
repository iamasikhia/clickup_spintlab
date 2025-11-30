import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

const Export = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading
        title="Export & Share"
        description="Download invoices as PDF or send them directly via email"
      />
      <Card className="mx-8">
        <CardHeader>
          <CardTitle>Select Invoice to Export</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <span className="font-semibold text-sm">Select invoice</span>
          <Select>
            <SelectTrigger className="w-[360px]">
              <SelectValue placeholder="Select an invoice to export or share" />
            </SelectTrigger>
          </Select>
        </CardContent>
      </Card>
      <Card className="mx-8">
        <CardHeader>
          <CardTitle>Export History</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Export;
