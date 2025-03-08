
import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ImageUploaderProps {
  selectedFiles: File[];
  onFilesChange: (files: File[]) => void;
}

const ImageUploader = ({ selectedFiles, onFilesChange }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onFilesChange([...selectedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">画像アップロード</h2>
      <Separator className="my-2" />
      <div className="mt-4">
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-slate-900">
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            クリックまたはドラッグ＆ドロップで画像をアップロード
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            JPG, PNG, GIF (最大10MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <Button 
            type="button" 
            variant="outline" 
            className="mt-4"
            onClick={handleFileButtonClick}
          >
            ファイルを選択
          </Button>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <div className="aspect-square rounded-md overflow-hidden border bg-background">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`アップロード画像 ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 rounded-full bg-destructive p-1 text-white"
                    aria-label="削除"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <p className="mt-1 text-xs truncate">{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
