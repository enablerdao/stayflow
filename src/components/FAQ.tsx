
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, delay }: FAQItemProps) => {
  return (
    <FadeIn delay={delay}>
      <div className="border-b border-border py-6 last:border-0">
        <button
          className="flex w-full items-center justify-between text-left focus:outline-none"
          onClick={onClick}
        >
          <h3 className="text-lg font-medium">{question}</h3>
          <ChevronDown
            size={20}
            className={cn("transform transition-transform duration-200", isOpen ? "rotate-180" : "")}
          />
        </button>
        <div
          className={cn(
            "mt-2 overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <p className="py-3 text-muted-foreground">{answer}</p>
        </div>
      </div>
    </FadeIn>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "このサービスはどんな人向けですか？",
      answer: "StayFlowは民泊ホスト、プロパティマネージャー、短期賃貸物件を管理する全ての方向けに設計されています。一つの物件から数百の物件まで、あなたのニーズに合わせて拡張し、運営を効率化します。"
    },
    {
      question: "利用開始までどのくらいの時間がかかりますか？",
      answer: "数分でサインアップして利用を開始できます。必要な情報を入力するだけで、すぐにプラットフォームのすべての機能にアクセスできます。直感的なインターフェースで、スムーズなオンボーディング体験を保証します。"
    },
    {
      question: "無料トライアルはありますか？",
      answer: "はい、クレジットカード不要の14日間無料トライアルをご提供しています。お申し込み前に、民泊ビジネスに合っているかどうかを確認するために、プラットフォームのすべての機能を体験できます。"
    },
    {
      question: "既存の予約プラットフォームと連携できますか？",
      answer: "もちろんです！StayFlowはAirbnb、Booking.com、VRBOなどの主要な予約プラットフォームとシームレスに連携します。全ての予約が自動的に一元化されたカレンダーに同期されます。"
    },
    {
      question: "清掃サービスの連携はどのように機能しますか？",
      answer: "当プラットフォームは、お客様の設定に基づいてゲストのチェックアウト後に自動的に清掃サービスをスケジュールします。既存の清掃業者と協力するか、エリア内の検証済み清掃サービスネットワークに接続することができます。"
    }
  ];

  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              よくある質問
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              よくあるご質問
            </h2>
            <p className="text-lg text-muted-foreground">
              StayFlowに関するよくある質問への回答
            </p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                  delay={100 * index}
                />
              ))}
            </div>
          </div>

          <FadeIn delay={300} className="mt-10 text-center">
            <p className="mb-4 text-muted-foreground">まだ質問がありますか？</p>
            <a
              href="#contact"
              className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
            >
              サポートチームにお問い合わせください →
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
