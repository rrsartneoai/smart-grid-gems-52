import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DropZoneProps {
  isDragging: boolean;
  isProcessing: boolean;
  selectedFile: File | null;
  onFileSelect: (files: FileList | null) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const DropZone = ({ 
  isDragging, 
  isProcessing, 
  selectedFile, 
  onFileSelect,
  setIsDragging 
}: DropZoneProps) => {
  const handleButtonClick = () => {
    // Programmatically click the hidden file input
    document.getElementById('file-upload')?.click();
  };

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-colors ${
        isDragging ? "border-primary bg-primary/10" : "border-border"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        onFileSelect(e.dataTransfer.files);
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-muted-foreground" />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isProcessing 
              ? `Processing file: ${selectedFile?.name}...` 
              : "Drag and drop a file or"}
          </p>
          <Button 
            variant="link" 
            className="mt-1" 
            disabled={isProcessing}
            onClick={handleButtonClick}
          >
            choose from disk
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            onChange={(e) => onFileSelect(e.target.files)}
            disabled={isProcessing}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          PDF, DOCX, PNG, JPG (max. 5MB)
        </p>
      </div>
    </Card>
  );
};