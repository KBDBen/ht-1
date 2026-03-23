import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL이 필요합니다" }, { status: 400 });
    }

    // 서버사이드에서 CSV fetch (CORS 우회)
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: "CSV 데이터를 가져올 수 없습니다. URL을 확인해주세요." },
        { status: 400 }
      );
    }

    const text = await res.text();
    const lines = text.trim().split("\n");

    if (lines.length < 2) {
      return NextResponse.json(
        { error: "데이터가 충분하지 않습니다 (최소 헤더 + 1행)" },
        { status: 400 }
      );
    }

    // 간단한 CSV 파싱
    const parseLine = (line: string) => {
      const result: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseLine(lines[0]);
    const rows = lines.slice(1).map(parseLine);

    return NextResponse.json({ headers, rows });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
