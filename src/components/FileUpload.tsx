import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { processDocumentForRAG } from "@/utils/ragUtils";
import { processImageFile, processPdfFile, processDocxFile } from "@/utils/fileProcessing";
import { useToast } from "@/hooks/use-toast";
import { FileInfo } from "./upload/FileInfo";
import { HelpCircle, FileText, Image as ImageIcon, Upload, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
  speed?: string;
}

export function FileUpload() {
  const { toast } = useToast();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const calculateSpeed = (bytesUploaded: number, startTime: number) => {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const bytesPerSecond = bytesUploaded / elapsedSeconds;
    return `${formatFileSize(bytesPerSecond)}/s`;
  };

  const handleFileUpload = async (file: File) => {
    const startTime = Date.now();
    let preview = undefined;

    if (file.type.includes("image")) {
      preview = URL.createObjectURL(file);
    }

    const newFile: UploadingFile = {
      file,
      progress: 0,
      status: 'uploading',
      preview,
    };

    setUploadingFiles(prev => [...prev, newFile]);

    try {
      let text = "";
      const progressInterval = setInterval(() => {
        setUploadingFiles(prev => prev.map(f => {
          if (f.file === file && f.progress < 100) {
            const newProgress = Math.min(f.progress + 10, 100);
            return {
              ...f,
              progress: newProgress,
              speed: calculateSpeed((newProgress / 100) * file.size, startTime),
            };
          }
          return f;
        }));
      }, 200);

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
      const topics = result
        .split("\n")
        .filter(line => line.trim().length > 0)
        .slice(0, 5)
        .map(topic => topic.replace(/^[0-9-.\s]+/, "").trim());

      setTopics(topics);
      clearInterval(progressInterval);

      setUploadingFiles(prev => prev.map(f => 
        f.file === file ? { ...f, progress: 100, status: 'completed' } : f
      ));

      toast({
        title: "Sukces",
        description: `Przetworzono plik: ${file.name}`,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadingFiles(prev => prev.map(f => 
        f.file === file ? { ...f, status: 'error' } : f
      ));
      toast({
        variant: "destructive",
        title: "Błąd",
        description: `Błąd podczas przetwarzania pliku: ${file.name}`,
      });
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await handleFileUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 5,
    maxSize: 20 * 1024 * 1024,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const handleCancelUpload = (file: File) => {
    setUploadingFiles(prev => prev.filter(f => f.file !== file));
    toast({
      description: `Anulowano wgrywanie pliku: ${file.name}`,
    });
  };

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
          <AnimatePresence>
            {isDragActive ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col items-center gap-2"
              >
                <Upload className="h-12 w-12 text-primary" />
                <p className="text-sm text-primary">Upuść pliki tutaj...</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-sm text-gray-600">
                  Przeciągnij i upuść pliki lub kliknij, aby wybrać
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Obsługiwane formaty: PDF, DOCX, PNG, JPG (max 20MB na plik, do 5 plików)
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {uploadingFiles.map((uploadingFile) => (
              <Card key={uploadingFile.file.name} className="p-4">
                <div className="flex items-start gap-4">
                  {uploadingFile.preview ? (
                    <img
                      src={uploadingFile.preview}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {uploadingFile.file.name}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCancelUpload(uploadingFile.file)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(uploadingFile.file.size)}
                    </p>
                    <div className="mt-2">
                      <Progress value={uploadingFile.progress} className="h-2" />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{uploadingFile.progress}%</span>
                      {uploadingFile.speed && uploadingFile.status === 'uploading' && (
                        <span>{uploadingFile.speed}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {uploadingFiles.length > 0 && uploadingFiles.some(f => f.status === 'completed') && (
        <FileInfo
          file={uploadingFiles.find(f => f.status === 'completed')!.file}
          topics={topics}
        />
      )}
    </div>
  );
}