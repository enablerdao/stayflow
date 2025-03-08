
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { extractPropertyFromText } from "@/utils/propertyTextProcessor";
import { PropertyFormData } from "@/data/propertyData";

interface BulkTextProcessorProps {
  onProcessed: (data: PropertyFormData) => void;
}

const BulkTextProcessor = ({ onProcessed }: BulkTextProcessorProps) => {
  const { toast } = useToast();
  const [bulkText, setBulkText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const processBulkText = async () => {
    if (!bulkText.trim()) {
      toast({
        title: "テキストが空です",
        description: "物件情報を入力してください。",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      toast({
        title: "テキスト処理中",
        description: "入力されたテキストから物件情報を抽出しています...",
        duration: 3000,
      });
      
      // 簡易的な情報抽出（実際にはLLMを使用）
      setTimeout(() => {
        const extracted = extractPropertyFromText(bulkText);
        
        // 抽出した情報をフォームにセット
        onProcessed({
          propertyName: extracted.name,
          propertyType: extracted.type,
          postalCode: extracted.postalCode,
          prefecture: extracted.prefecture,
          city: extracted.city,
          address: extracted.address,
          price: extracted.price,
          size: extracted.size,
          yearBuilt: extracted.year,
          description: extracted.desc
        });
        
        setIsProcessing(false);
        
        toast({
          title: "処理完了",
          description: "テキストから物件情報を抽出しました。内容を確認して必要に応じて編集してください。",
          duration: 5000,
        });
      }, 2000); // 2秒後に処理完了（実際にはLLM APIの応答時間に依存）
    } catch (error: any) {
      setIsProcessing(false);
      toast({
        title: "処理エラー",
        description: error.message || "テキスト処理中にエラーが発生しました。",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">テキストからの一括入力</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="bulkText">
            物件情報をコピペしてください
            <span className="text-sm text-muted-foreground ml-2 font-normal">
              (サイト全体のコピーや不要な文字を含んでいても大丈夫です)
            </span>
          </Label>
          <Textarea 
            id="bulkText"
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder="物件情報をここに貼り付けてください。他のサイトからの情報やフォーマットされていない情報も処理できます。"
            className="min-h-[300px] text-sm font-mono"
          />
        </div>
        <Button 
          type="button"
          onClick={processBulkText}
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
              処理中...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              テキストから物件情報を抽出する
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BulkTextProcessor;
