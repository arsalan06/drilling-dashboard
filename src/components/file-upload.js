import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { parseExcelFile, parseCSVFile, saveToLocalStorage, } from "@/lib/file-utils";
export function FileUpload({ onDataUploaded, wellId }) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);
    const { toast } = useToast();
    const handleFileSelect = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
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
            let data;
            if (file.name.endsWith(".xlsx")) {
                data = await parseExcelFile(file);
            }
            else {
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
        }
        catch (error) {
            toast({
                title: "Upload failed",
                description: error instanceof Error ? error.message : "Failed to process file",
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
    return (_jsxs(_Fragment, { children: [_jsxs(Button, { onClick: handleBrowseClick, disabled: uploading, className: "hidden sm:flex items-center gap-2", "data-testid": "button-upload-header", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload"] }), _jsx("input", { ref: fileInputRef, type: "file", accept: ".xlsx,.csv", onChange: handleFileSelect, className: "hidden", "data-testid": "input-file-upload" })] }));
}
