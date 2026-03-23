export interface DeepInsight {
  title: string;
  description: string;
}

export interface AdditionalData {
  dataName: string;
  reason: string;
  expectedInsight: string;
}

interface Props {
  deepInsights: DeepInsight[];
  additionalData: AdditionalData[];
}

export default function DeepInsights({ deepInsights, additionalData }: Props) {
  return (
    <div className="mt-8 space-y-8">
      {/* 심층 인사이트 섹션 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">💡 심층 인사이트</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deepInsights.map((insight, i) => (
            <div key={i} className="p-5 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white text-sm font-bold rounded-full">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-indigo-900">{insight.title}</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 추가 데이터 제안 섹션 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📎 추가 데이터 제안</h2>
        <p className="text-gray-500 text-sm mb-4">
          아래 데이터를 추가하면 더 깊은 분석이 가능합니다
        </p>
        <div className="space-y-3">
          {additionalData.map((item, i) => (
            <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-1">
                📌 {item.dataName}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-700">필요한 이유:</span> {item.reason}
              </p>
              <p className="text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded">
                → 기대 인사이트: {item.expectedInsight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
