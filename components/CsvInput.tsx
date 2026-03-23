"use client";

import { useState } from "react";

interface Props {
  onSubmit: (url: string) => void;
  loading: boolean;
}

const SAMPLE_SHEETS = [
  { name: "CS시트", url: "https://docs.google.com/spreadsheets/d/1vcg6FiLuuzT_OnISIA-RnpIrKPb3tOJwpTpvvv-ZqYI/export?format=csv" },
  { name: "2025마켓", url: "https://docs.google.com/spreadsheets/d/1j73H-KzataADbYMtrxtA6YPGIOwWdJZz2tq1qbvQefU/export?format=csv" },
];

export default function CsvInput({ onSubmit, loading }: Props) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  const handleSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    onSubmit(sampleUrl);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Google Sheets CSV URL을 입력하세요"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              불러오는 중...
            </span>
          ) : (
            "데이터 불러오기"
          )}
        </button>
      </form>
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
        <span>예제 시트:</span>
        {SAMPLE_SHEETS.map((sheet) => (
          <button
            key={sheet.name}
            onClick={() => handleSample(sheet.url)}
            disabled={loading}
            className="px-3 py-1 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-full transition-colors disabled:opacity-50"
          >
            {sheet.name}
          </button>
        ))}
      </div>
    </div>
  );
}
