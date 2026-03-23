"use client";

import { useState } from "react";
import CsvInput from "@/components/CsvInput";
import DataPreview from "@/components/DataPreview";
import InsightCards from "@/components/InsightCards";

interface Insights {
  summary: string;
  patterns: string[];
  outliers: string[];
  actions: string[];
}

export default function Home() {
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  // CSV URL에서 데이터 가져오기
  const handleFetchCsv = async (url: string) => {
    setError("");
    setCsvData(null);
    setInsights(null);
    setLoading(true);

    try {
      const res = await fetch("/api/fetch-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "CSV 데이터를 가져올 수 없습니다");
      }

      const { headers: h, rows } = await res.json();
      setHeaders(h);
      setCsvData(rows);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  // AI 분석 실행
  const handleAnalyze = async () => {
    if (!csvData || !headers.length) return;
    setAnalyzing(true);
    setError("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headers, rows: csvData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "분석에 실패했습니다");
      }

      const data: Insights = await res.json();
      setInsights(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "분석 중 오류가 발생했습니다");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        📊 CSV 데이터 AI 분석기
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Google Sheets CSV URL을 입력하면 AI가 데이터를 분석해 인사이트를 제공합니다
      </p>

      <CsvInput onSubmit={handleFetchCsv} loading={loading} />

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {csvData && (
        <>
          <DataPreview headers={headers} rows={csvData} />
          <div className="mt-6 text-center">
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {analyzing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  AI 분석 중...
                </span>
              ) : (
                "🤖 AI 분석 시작"
              )}
            </button>
          </div>
        </>
      )}

      {insights && <InsightCards insights={insights} />}
    </main>
  );
}
