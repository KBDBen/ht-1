interface Insights {
  summary: string;
  patterns: string[];
  outliers: string[];
  actions: string[];
}

interface Props {
  insights: Insights;
}

const cards = [
  { key: "summary", title: "📝 전체 요약", color: "bg-blue-50 border-blue-200" },
  { key: "patterns", title: "🔍 발견된 패턴", color: "bg-green-50 border-green-200" },
  { key: "outliers", title: "⚠️ 이상값", color: "bg-yellow-50 border-yellow-200" },
  { key: "actions", title: "🚀 액션 아이템", color: "bg-purple-50 border-purple-200" },
] as const;

export default function InsightCards({ insights }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map(({ key, title, color }) => {
        const value = insights[key];
        return (
          <div key={key} className={`p-5 rounded-lg border ${color}`}>
            <h3 className="font-semibold text-lg mb-3">{title}</h3>
            {typeof value === "string" ? (
              <p className="text-gray-700 leading-relaxed">{value}</p>
            ) : (
              <ul className="space-y-2">
                {value.map((item: string, i: number) => (
                  <li key={i} className="text-gray-700 flex gap-2">
                    <span className="text-gray-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
