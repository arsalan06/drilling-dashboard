import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, File } from "lucide-react";
import {
  parseExcelFile,
  parseCSVFile,
  saveToLocalStorage,
} from "@/lib/file-utils";
import { WellDataRow } from "@/types/well-data";

interface FileUploadProps {
  onDataUploaded: (data: WellDataRow[]) => void;
  wellId: string;
}

export function FileUpload({ onDataUploaded, wellId }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|csv)$/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel (.xlsx) or CSV file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setFileName(file.name);
    setProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      let data: WellDataRow[];

      if (file.name.endsWith(".xlsx")) {
        data = await parseExcelFile(file);
      } else {
        data = await parseCSVFile(file);
      }

      clearInterval(progressInterval);
      setProgress(100);

      // Save to localStorage
      const storageKey = `well_data_${wellId}`;
      saveToLocalStorage(storageKey, {
        fileName: file.name,
        data,
        uploadedAt: new Date().toISOString(),
      });

      onDataUploaded(data);

      toast({
        title: "File uploaded successfully",
        description: `Processed ${data.length} data points from ${file.name}`,
      });

      // Reset after a delay
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
        setFileName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 2000);
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "Failed to process file",
        variant: "destructive",
      });

      setUploading(false);
      setProgress(0);
      setFileName("");
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* // <Card>
    //   <CardHeader>
    //     <CardTitle className="flex items-center gap-2">
    //       <Upload className="h-5 w-5" />
    //       File Upload
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent> */}
      {/* <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary hover:bg-muted/50 transition-colors">
        <div className="mb-4">
          <File className="h-12 w-12 text-muted-foreground mx-auto" />
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Drop Excel/CSV files here or
        </p> */}
      <Button
        onClick={handleBrowseClick}
        disabled={uploading}
        className="hidden sm:flex items-center gap-2"
        data-testid="button-upload-header"
      >
        <Upload className="h-4 w-4" />
        Upload
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.csv"
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-file-upload"
      />
      {/* </div> */}

      {/* {uploading && (
          <div className="mt-4" data-testid="upload-progress">
            <div className="flex items-center justify-between text-sm mb-2">
              <span data-testid="text-upload-filename">{fileName}</span>
              <span data-testid="text-upload-percentage">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
      </CardContent>
    </Card> */}
    </>
  );
}
