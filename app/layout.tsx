import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSV 데이터 AI 분석기",
  description: "Google Sheets CSV 데이터를 AI로 분석하여 인사이트를 제공합니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
