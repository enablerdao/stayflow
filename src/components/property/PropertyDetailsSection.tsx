
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PropertyFormData } from "@/data/propertyData";

interface PropertyDetailsSectionProps {
  formData: PropertyFormData;
  onUpdate: (field: keyof PropertyFormData, value: any) => void;
}

const PropertyDetailsSection = ({ formData, onUpdate }: PropertyDetailsSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">物件詳細</h2>
      <Separator className="my-2" />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">価格 (万円) <span className="text-red-500">*</span></Label>
          <Input 
            id="price" 
            type="number" 
            placeholder="例：5000" 
            required 
            value={formData.price}
            onChange={(e) => onUpdate('price', e.target.value ? Number(e.target.value) : '')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="size">面積 (㎡) <span className="text-red-500">*</span></Label>
          <Input 
            id="size" 
            type="number" 
            placeholder="例：80.5" 
            required 
            value={formData.size}
            onChange={(e) => onUpdate('size', e.target.value ? Number(e.target.value) : '')}
            step="0.1"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yearBuilt">築年数</Label>
          <Input 
            id="yearBuilt" 
            type="number" 
            placeholder="例：10" 
            value={formData.yearBuilt}
            onChange={(e) => onUpdate('yearBuilt', e.target.value ? Number(e.target.value) : '')}
          />
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <Label htmlFor="description">物件説明</Label>
        <Textarea 
          id="description" 
          placeholder="物件の特徴や周辺環境などを入力してください"
          className="min-h-[120px]"
          value={formData.description}
          onChange={(e) => onUpdate('description', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PropertyDetailsSection;
