import { LucideDownload, LucideSend } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ExportOptionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-x-2 items-center">
          <LucideSend size="20px" />
          <span>Export and Share Options</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 grid-rows-1 gap-x-4">
          <Button
            variant="outline"
            className="columns-1 p-4 h-full flex flex-col"
          >
            <div className="flex gap-x-2 items-center font-semibold text-lg">
              <LucideDownload />
              Download PDF
            </div>
            <div className="text-xs">
              Download as a{" "}
              <span className="bg-input py-0.5 px-1 font-mono rounded-sm">
                .pdf
              </span>{" "}
              file
            </div>
          </Button>
          <Button
            variant="outline"
            className="columns-1 p-4 h-full flex flex-col"
          >
            <div className="flex gap-x-2 items-center font-semibold text-lg">
              <LucideDownload />
              Email
            </div>
            <div className="text-xs">Send an email to the client</div>
          </Button>
          <Button
            variant="outline"
            className="columns-1 p-4 h-full flex flex-col"
          >
            <div className="flex gap-x-2 items-center font-semibold text-lg">
              <LucideDownload />
              Preview
            </div>
            <div className="text-xs">Preview invoice before exporting</div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ExportOptionsCard };
