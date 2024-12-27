import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { processDocumentForRAG } from "@/utils/ragUtils";
import { processImageFile, processPdfFile, processDocxFile } from "@/utils/fileProcessing";
import { useToast } from "@/hooks/use-toast";
import { FileInfo } from "./upload/FileInfo";
import { HelpCircle, FileText, Image as ImageIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function FileUpload() {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        setIsProcessing(true);
        setUploadProgress(0);
        let text = "";
        
        // Generate preview for images
        if (file.type.includes("image")) {
          const preview = URL.createObjectURL(file);
          setFilePreview(preview);
          text = await processImageFile(file);
        } else if (file.type === "application/pdf") {
          setFilePreview(null);
          text = await processPdfFile(file);
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          setFilePreview(null);
          text = await processDocxFile(file);
        } else {
          throw new Error("Nieobsługiwany format pliku");
        }

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 10;
          });
        }, 200);

        console.log("Extracted text:", text.substring(0, 100) + "...");
        
        const result = await processDocumentForRAG(text);
        console.log("RAG processing result:", result);
        
        setUploadedFile(file);
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
        setUploadProgress(0);
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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Wgraj pliki</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Obsługiwane formaty: PDF, DOCX, PNG, JPG</p>
              <p>Maksymalny rozmiar: 20MB na plik</p>
              <p>Limit plików: 5</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card
        {...getRootProps()}
        className={`p-6 border-2 border-dashed cursor-pointer transition-colors relative ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {isProcessing ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Przetwarzanie pliku...</p>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          ) : isDragActive ? (
            <p className="text-sm text-gray-600">Upuść pliki tutaj...</p>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                {filePreview ? (
                  <img src={filePreview} alt="Preview" className="max-h-32 rounded-lg" />
                ) : uploadedFile?.type === "application/pdf" ? (
                  <FileText className="h-16 w-16 text-muted-foreground" />
                ) : (
                  <ImageIcon className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-gray-600">
                Przeciągnij i upuść pliki lub kliknij, aby wybrać
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Obsługiwane formaty: PDF, DOCX, PNG, JPG (max 20MB na plik, do 5 plików)
              </p>
            </>
          )}
        </div>
      </Card>

      {uploadedFile && <FileInfo file={uploadedFile} topics={topics} />}
    </div>
  );
}