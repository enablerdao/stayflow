
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { prefectures, propertyTypes } from "@/data/propertyData";
import { PropertyFormData } from "@/data/propertyData";

interface BasicInfoSectionProps {
  formData: PropertyFormData;
  onUpdate: (field: keyof PropertyFormData, value: any) => void;
}

const BasicInfoSection = ({ formData, onUpdate }: BasicInfoSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">基本情報</h2>
      <Separator className="my-2" />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="propertyName">物件名 <span className="text-red-500">*</span></Label>
          <Input 
            id="propertyName" 
            placeholder="例：スカイタワー麻布十番" 
            required 
            value={formData.propertyName}
            onChange={(e) => onUpdate('propertyName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="propertyType">物件タイプ <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.propertyType} 
            onValueChange={(value) => onUpdate('propertyType', value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="物件タイプを選択" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="postalCode">郵便番号 <span className="text-red-500">*</span></Label>
          <Input 
            id="postalCode" 
            placeholder="例：123-4567" 
            required 
            value={formData.postalCode}
            onChange={(e) => onUpdate('postalCode', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="prefecture">都道府県 <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.prefecture} 
            onValueChange={(value) => onUpdate('prefecture', value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {prefectures.map((pref) => (
                <SelectItem key={pref} value={pref}>{pref}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">市区町村 <span className="text-red-500">*</span></Label>
          <Input 
            id="city" 
            placeholder="例：港区" 
            required 
            value={formData.city}
            onChange={(e) => onUpdate('city', e.target.value)}
          />
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <Label htmlFor="address">番地・建物名 <span className="text-red-500">*</span></Label>
        <Input 
          id="address" 
          placeholder="例：麻布十番1-2-3 スカイビル101" 
          required 
          value={formData.address}
          onChange={(e) => onUpdate('address', e.target.value)}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
