
import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
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
          className="flex w-full items-center justify-between text-left focus:outline-none group"
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            {isOpen ? 
              <MessageCircle size={22} className="text-stayflow-600 flex-shrink-0" /> : 
              <HelpCircle size={22} className="text-stayflow-500 flex-shrink-0" />
            }
            <h3 className={cn(
              "text-lg font-medium transition-colors duration-200",
              isOpen ? "text-stayflow-800" : "group-hover:text-stayflow-700"
            )}>
              {question}
            </h3>
          </div>
          <ChevronDown
            size={20}
            className={cn(
              "text-stayflow-500 transform transition-transform duration-300",
              isOpen ? "rotate-180" : "group-hover:text-stayflow-700"
            )}
          />
        </button>
        <div
          className={cn(
            "pl-10 overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
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
      question: "StayFlowはどのような宿泊施設に適していますか？",
      answer: "StayFlowは、民泊、ホテル、旅館など、あらゆる規模の宿泊施設に対応しています。個人オーナーから複数物件を管理する企業まで、カスタマイズ可能なソリューションで効率的な運営をサポートします。特に複数の予約サイトを利用している場合、一元管理による業務効率化のメリットが大きいでしょう。"
    },
    {
      question: "初期設定はどのくらい時間がかかりますか？",
      answer: "基本的な設定は約15分で完了します。StayFlowの専門チームが初期設定をサポートし、既存の予約プラットフォームとの連携もお手伝いします。オンボーディングプロセスはシンプルで、すぐに使い始めることができます。より複雑な設定やカスタマイズが必要な場合でも、通常24時間以内に運用開始が可能です。"
    },
    {
      question: "無料トライアルの制限はありますか？",
      answer: "14日間の無料トライアルでは、クレジットカード登録不要で、プレミアムプランのすべての機能をお試しいただけます。トライアル期間中の予約数や物件数に制限はなく、実際の業務でどれだけ効率化できるかを体験していただけます。トライアル終了後もデータはそのまま保持されるため、継続利用の際にもスムーズに移行できます。"
    },
    {
      question: "複数の予約サイトとの連携方法を教えてください",
      answer: "StayFlowは、Airbnb、Booking.com、Expedia、楽天トラベル、じゃらんなど主要な予約プラットフォームとAPIを通じて直接連携します。連携設定は管理画面から数クリックで完了し、自動で予約情報が同期されます。予約の重複を防ぎ、各プラットフォームの料金やカレンダーを一括管理できるため、オーバーブッキングのリスクを大幅に削減します。"
    },
    {
      question: "清掃スタッフとのコミュニケーション機能について詳しく教えてください",
      answer: "StayFlowの清掃管理システムでは、チェックアウト後の清掃タスクが自動で作成され、登録済みの清掃スタッフにリアルタイムで通知されます。清掃スタッフ専用のモバイルアプリでは、タスクの確認、作業完了報告、問題点の写真付き報告が可能です。また、定期的な品質チェックリストの提供や、清掃履歴の管理機能により、高品質なサービス維持をサポートします。緊急時の代替スタッフ手配機能も備えています。"
    },
    {
      question: "料金プランの違いと支払い方法について教えてください",
      answer: "StayFlowでは、物件数に応じた3つの料金プランをご用意しています。スタータープラン（月額9,800円・最大5物件）、ビジネスプラン（月額29,800円・最大30物件）、エンタープライズプラン（カスタム料金・無制限）があり、年間契約で20%割引が適用されます。支払いはクレジットカード、銀行振込、PayPalに対応し、請求書は管理画面からいつでもダウンロード可能です。すべてのプランに無料サポートが含まれています。"
    },
    {
      question: "オフラインでも利用できますか？",
      answer: "StayFlowのモバイルアプリはオフライン機能を搭載しており、インターネット接続がない環境でも基本的な情報の閲覧やデータ入力が可能です。オフライン時に行った操作は、接続復旧時に自動的に同期されます。これにより、地方の通信環境が不安定なエリアでも安心してご利用いただけます。ただし、リアルタイム通知などの一部機能はオンライン接続が必要です。"
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-secondary/40 to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              サポート
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-stayflow-600 to-stayflow-800 bg-clip-text text-transparent">
              よくあるご質問
            </h2>
            <p className="text-lg text-muted-foreground">
              StayFlowに関するよくある質問をまとめました。さらに詳しい情報が必要な場合はお気軽にお問い合わせください。
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-1 md:p-2">
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

          <FadeIn delay={300} className="mt-12 text-center">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-stayflow-100">
              <h3 className="text-xl font-semibold mb-4">まだ質問がありますか？</h3>
              <p className="mb-6 text-muted-foreground">
                ご不明な点があれば、いつでもサポートチームにお問い合わせください。
                <br />平日9:00〜18:00の間、通常1時間以内に返信いたします。
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-stayflow-600 text-white font-medium hover:bg-stayflow-700 transition-colors duration-300"
              >
                お問い合わせはこちら →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
