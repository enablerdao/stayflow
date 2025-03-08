
/**
 * Utility functions for processing property text data
 */

import { prefectures } from '@/data/propertyData';

export type ExtractedPropertyData = {
  name: string;
  type: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  price: number | '';
  size: number | '';
  year: number | '';
  desc: string;
};

/**
 * Extract property information from unstructured text
 */
export const extractPropertyFromText = (text: string): ExtractedPropertyData => {
  let name = text.match(/(?:物件名|マンション名)[:：]?\s*([^\n,]+)/i)?.[1] || '';
  let type = text.includes('マンション') ? 'apartment' : 
             text.includes('一戸建て') ? 'house' : 
             text.includes('店舗') ? 'shop' : 
             text.includes('オフィス') ? 'office' : 
             text.includes('土地') ? 'land' : '';
  let postalCodeMatch = text.match(/〒?\s*(\d{3}[-－]?\d{4})/);
  let postalCode = postalCodeMatch ? postalCodeMatch[1] : '';
  
  // 都道府県を検出
  let detectedPrefecture = '';
  for (const pref of prefectures) {
    if (text.includes(pref)) {
      detectedPrefecture = pref;
      break;
    }
  }
  
  // 市区町村を正規表現でざっくり抽出
  let cityMatch = text.match(new RegExp(`${detectedPrefecture}([^\\d\\n]{2,10}区?市?町?村?)`));
  let city = cityMatch ? cityMatch[1].trim() : '';
  
  // 住所の残りの部分
  let addressMatch = text.match(new RegExp(`${detectedPrefecture}${city}([^\\n]+)`));
  let address = addressMatch ? addressMatch[1].trim() : '';
  
  // 価格（万円）
  let priceMatch = text.match(/(?:価格|販売価格)[:：]?\s*(\d{1,3}[,，]?\d{3}|\d{1,3})(?:万円)?/);
  let price = priceMatch ? parseInt(priceMatch[1].replace(/[,，]/g, '')) : '';
  
  // 面積（㎡）
  let sizeMatch = text.match(/(?:面積|専有面積)[:：]?\s*(\d+\.?\d*)(?:\s*[㎡m²])?/);
  let size = sizeMatch ? parseFloat(sizeMatch[1]) : '';
  
  // 築年数
  let yearMatch = text.match(/(?:築|築年数)[:：]?\s*(\d{1,2})(?:年)?/);
  let year = yearMatch ? new Date().getFullYear() - parseInt(yearMatch[1]) : '';
  
  // 説明文（最初の100文字程度）
  let desc = text.substring(0, 200).replace(/\n+/g, ' ');
  
  return { name, type, postalCode, prefecture: detectedPrefecture, city, address, price, size, year, desc };
};
