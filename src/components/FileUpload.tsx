import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { processDocumentForRAG } from "@/utils/ragUtils";
import { processImageFile, processPdfFile, processDocxFile } from "@/utils/fileProcessing";
import { useToast } from "@/hooks/use-toast";
import { FileInfo } from "./upload/FileInfo";

export function FileUpload() {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        setIsProcessing(true);
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

        console.log("Extracted text:", text.substring(0, 100) + "...");
        
        const result = await processDocumentForRAG(text);
        console.log("RAG processing result:", result);
        
        setUploadedFile(file);
        // Parse the RAG result to extract topics
        const topics = result
          .split("\n")
          .filter(line => line.trim().length > 0)
          .slice(0, 5)
          .map(topic => topic.replace(/^[0-9-.\s]+/, "").trim());
        
        setTopics(topics);
        
        toast({
          title: "Sukces",
          description: `Przetworzono plik: ${file.name}`,
        });
      } catch (error) {
        console.error("Error processing file:", error);
        toast({
          variant: "destructive",
          title: "Błąd",
          description: `Błąd podczas przetwarzania pliku: ${file.name}`,
        });
      } finally {
        setIsProcessing(false);
      }
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    maxSize: 20 * 1024 * 1024,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`p-6 border-2 border-dashed cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isProcessing 
              ? "Przetwarzanie pliku..."
              : isDragActive
              ? "Upuść pliki tutaj..."
              : "Przeciągnij i upuść pliki lub kliknij, aby wybrać"}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Obsługiwane formaty: PDF, DOCX, PNG, JPG (max 20MB na plik, do 5 plików)
          </p>
        </div>
      </Card>

      {uploadedFile && <FileInfo file={uploadedFile} topics={topics} />}
    </div>
  );
}