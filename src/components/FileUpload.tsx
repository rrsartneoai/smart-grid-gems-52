import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { processDocumentForRAG } from "@/utils/ragUtils";
import { processImageFile, processPdfFile, processDocxFile } from "@/utils/fileProcessing";
import { useToast } from "@/hooks/use-toast";

export function FileUpload() {
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      let text = "";
      if (file.type.includes("image")) {
        text = await processImageFile(file);
      } else if (file.type === "application/pdf") {
        text = await processPdfFile(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await processDocxFile(file);
      } else {
        throw new Error("Nieobsługiwany format pliku");
      }

      const result = await processDocumentForRAG(text);
      toast({
        title: "Sukces",
        description: result,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Wystąpił problem podczas przetwarzania pliku",
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <Card
      {...getRootProps()}
      className={`p-6 border-2 border-dashed cursor-pointer transition-colors ${
        isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <p className="text-sm text-gray-600">
          {isDragActive
            ? "Upuść plik tutaj..."
            : "Przeciągnij i upuść plik lub kliknij, aby wybrać"}
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Obsługiwane formaty: PDF, DOCX, PNG, JPG (max 5MB)
        </p>
      </div>
    </Card>
  );
}