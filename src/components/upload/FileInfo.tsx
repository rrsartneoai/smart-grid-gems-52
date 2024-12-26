import { Card } from "@/components/ui/card";
import { FileText, List } from "lucide-react";

interface FileInfoProps {
  file: File;
  topics?: string[];
}

export function FileInfo({ file, topics = [] }: FileInfoProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-start gap-4">
        <FileText className="h-8 w-8 text-primary" />
        <div className="flex-1">
          <h3 className="font-medium">Wgrany plik</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Nazwa: {file.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Rozmiar: {formatFileSize(file.size)}
          </p>
          
          {topics && topics.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <List className="h-4 w-4" />
                Główne zagadnienia:
              </h4>
              <ul className="mt-2 space-y-1">
                {topics.map((topic, index) => (
                  <li key={index} className="text-sm text-muted-foreground pl-6">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}